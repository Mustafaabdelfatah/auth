<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Spatie\WelcomeNotification\WelcomeNotification;

class InitialPasswordForNewUser extends WelcomeNotification
{
    /**
     * @return MailMessage
     */
    public function buildWelcomeNotificationMessage(): MailMessage
    {
        return (new MailMessage)
            ->subject("Welcome to ". config('app.name') ."app")
            ->action(Lang::get('Set initial password'), $this->showWelcomeFormUrl);
    }
}
