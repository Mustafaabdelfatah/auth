<?php

namespace App\Filters\Global;

use Closure;

class JsonDisplayNameFilter
{
    public function handle($request, Closure $next)
    {
        $query = $next($request);

        $languages = config('app.supported_languages') ?? ['ar', 'en'];

        $query->when(request()?->has('search') && !empty(request('search')), function ($q) use ($languages) {
            $search = request('search');
            $q->where(function ($q) use ($languages, $search) {
                foreach ($languages as $language) {
                    $q->orWhereRaw("JSON_EXTRACT(display_name, '$.$language') LIKE ?", ["%$search%"]);
                }
            });
        });


        return $query;
    }
}
