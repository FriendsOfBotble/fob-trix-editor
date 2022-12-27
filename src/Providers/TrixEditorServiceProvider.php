<?php

namespace Datlechin\TrixEditor\Providers;

use Botble\Base\Traits\LoadAndPublishDataTrait;
use Form;
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
            add_filter(BASE_FILTER_AVAILABLE_EDITORS, function (array $editors) {
                return array_merge($editors, ['trix' => 'Trix']);
            }, 143);
        });
    }
}
