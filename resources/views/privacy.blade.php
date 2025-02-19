<x-layout :title="'Privacy Policy'">
    <main class="flex min-h-0 flex-col flex-1">
        <section class="px-4 py-8 text-center">
            <h1 class="font-semibold text-4xl">Privacy Policy</h1>
        </section>
        <article class="prose w-full max-w-3xl mx-auto motion-preset-slide-up motion-duration-300">
            <p>Last updated: {{now()->format('d M Y')}}</p>

            <h2>1. Introduction</h2>
            <p>Welcome to Larakit. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li>Personal Information (name, email, phone number, etc.)</li>
                <li>Usage Data (IP address, browser type, pages visited, etc.)</li>
                <li>Cookies and Tracking Technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Provide and improve our services</li>
                <li>Communicate with you</li>
                <li>Analyze usage and trends</li>
                <li>Ensure security and prevent fraud</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>We do not sell or rent your personal data. We may share information with:</p>
            <ul>
                <li>Service providers who help operate our business</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in case of a merger or acquisition</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We take security measures to protect your data, but no method is 100% secure. Please use strong passwords and avoid sharing sensitive information online.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access and update your data</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
            </ul>

            <h2>7. Third-Party Links</h2>
            <p>Our website may contain links to third-party sites. We are not responsible for their privacy policies or practices.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Please review it periodically.</p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, you can contact us at [Your Email or Contact Info].</p>
        </article>
    </main>
</x-layout>
