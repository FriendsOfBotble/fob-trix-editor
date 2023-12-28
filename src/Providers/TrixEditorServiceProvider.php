<?php

namespace FriendsOfBotble\TrixEditor\Providers;

use Botble\Base\Facades\Form;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Illuminate\Support\ServiceProvider;

class TrixEditorServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function boot(): void
    {
        $this
            ->setNamespace('plugins/trix-editor')
            ->loadAndPublishViews()
            ->publishAssets();

        Form::component('trix', 'plugins/trix-editor::forms.partials.trix', [
            'name',
            'value' => null,
            'attributes' => [],
        ]);

        $this->app->booted(function () {
            add_filter(
                BASE_FILTER_AVAILABLE_EDITORS,
                fn (array $editors) => [...$editors, 'trix' => 'Trix'],
                143
            );
        });
    }
}
