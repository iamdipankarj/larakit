# Use an official PHP runtime as the base image
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    nginx \
    zip \
    libzip-dev \
    libpq-dev \
    npm && \
    docker-php-ext-install pdo_pgsql zip exif pcntl && \
    docker-php-ext-install opcache && \
    docker-php-ext-enable pdo_pgsql

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copy application source code
COPY . .

ARG BUILD_ENV

COPY .env.${BUILD_ENV}.example .env

RUN git config --global --add safe.directory /var/www/html

RUN echo "\nBUILD_ID=$(git rev-parse --short HEAD)" >> .env

# Install Node.js dependencies
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev \
    && yarn install --frozen-lockfile \
    && yarn build

# Set permissions for Laravel storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Copy Nginx configuration
COPY nginx/${BUILD_ENV}.nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN sed -i 's/^pm = .*/pm = dynamic/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^pm.max_children = .*/pm.max_children = 50/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^pm.start_servers = .*/pm.start_servers = 5/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^pm.min_spare_servers = .*/pm.min_spare_servers = 5/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^pm.max_spare_servers = .*/pm.max_spare_servers = 10/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^pm.max_requests = .*/pm.max_requests = 500/' /usr/local/etc/php-fpm.d/www.conf

COPY opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Start both services using the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
