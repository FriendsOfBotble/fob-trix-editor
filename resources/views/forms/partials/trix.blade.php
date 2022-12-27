@php
    Assets::addStylesDirectly('vendor/core/plugins/trix-editor/css/trix.css')
        ->addScriptsDirectly('vendor/core/plugins/trix-editor/js/trix.umd.min.js')
        ->addScriptsDirectly('vendor/core/core/base/js/editor.js')
        ->addScriptsDirectly('vendor/core/plugins/trix-editor/js/editor.js');

    $id = Arr::get($attributes, 'id', $name);
    $attributes['class'] = Arr::get($attributes, 'class', '') . ' trix-editor';
    $attributes['id'] = $id;
    $attributes['style'] = 'display: none;';
@endphp

{!! Form::textarea($name, BaseHelper::cleanEditorContent($value), $attributes) !!}
<trix-editor input="{{ $id }}"></trix-editor>
