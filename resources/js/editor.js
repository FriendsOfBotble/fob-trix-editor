$(document).ready(function () {
    const trixEditor = document.querySelector('trix-editor').editor

    $(document).on('click', '.show-hide-editor-btn', event => {
        event.preventDefault()
        const _self = $(event.currentTarget)
        const editorInstance = _self.data('result')
        const $result = $('#' + editorInstance)

        if ($result.hasClass('trix-editor')) {
            $result.toggle()
            $('trix-toolbar').toggle()
            $('trix-editor').toggle()
        }
    })

    document.addEventListener('core-insert-shortcode', e => {
        trixEditor.insertString(e.detail.shortcode)
    })

    document.addEventListener('core-insert-media', e => {
        const files = e.detail.files

        if (e.detail.element.data('action') !== 'media-insert-trix' || files.length === 0) {
            return
        }

        const parentEl = document.createElement('div')


        files.forEach(function (file) {
            let content;

            if (file.type === 'image') {
                const image = document.createElement('img')
                image.src = file.full_url
                content = image.outerHTML
            } else {
                const link = document.createElement('a')
                link.href = file.full_url
                link.text = file.name
                content = link.outerHTML
            }

            let attachment = new Trix.Attachment({ content })
            trixEditor.insertAttachment(attachment)
        })

        trixEditor.insertHTML(parentEl.innerHTML)
    })
})
