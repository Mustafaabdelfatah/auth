<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;

class UserPasswordResetNotification extends ResetPassword
{
    protected function resetUrl($notifiable)
    {
        if (static::$createUrlCallback) {
            return call_user_func(static::$createUrlCallback, $notifiable, $this->token);
        }

        return config('external_routes.forget-password') . "?token=$this->token";
    }
}
