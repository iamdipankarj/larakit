<?php

namespace App\Mail;

use App\Models\Invitation;
use App\Models\Organization;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrganizationInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public Invitation $invitation;
    public string $userName;
    public Organization $organization;

    /**
     * Create a new message instance.
     */
    public function __construct(Invitation $invitation, string $userName, Organization $organization)
    {
        $this->invitation = $invitation;
        $this->userName = $userName;
        $this->organization = $organization;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Invitation to Join ' . $this->organization->name
        );
    }

    public function build()
    {
        $acceptUrl = url('/invitations/accept?token=' . $this->invitation->token);

        return $this->subject('Your Invitation to Join ' . $this->organization->name)
            ->view('mail.organization-invitation-mail')
            ->with([
                'name' => $this->userName,
                'acceptUrl' => $acceptUrl
            ]);
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.organization-invitation-mail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
