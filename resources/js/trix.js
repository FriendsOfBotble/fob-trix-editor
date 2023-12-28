import Trix from 'trix'

document.addEventListener('DOMContentLoaded', () => {
    const trixEditor = document.querySelector('trix-editor').editor

    document.querySelector('.show-hide-editor-btn').addEventListener('click', function (event) {
        event.preventDefault()

        const currentTarget = event.currentTarget
        const editorInstance = currentTarget.dataset.result
        const result = document.getElementById(editorInstance)

        if (result.classList.contains('trix-editor')) {
            result.style.display = result.style.display === 'none' ? 'block' : 'none'
            document.querySelector('trix-toolbar').style.display = result.style.display
            document.querySelector('trix-editor').style.display = result.style.display
        }
    })

    document.addEventListener('core-insert-shortcode', (e) => {
        trixEditor.insertString(e.detail.shortcode)
    })

    document.addEventListener('core-insert-media', (e) => {
        const files = e.detail.files

        if (e.detail.element.data('action') !== 'media-insert-trix' || files.length === 0) {
            return
        }

        const parentEl = document.createElement('div')

        files.forEach(function (file) {
            let content

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

            const attachment = new Trix.Attachment({ content })
            trixEditor.insertAttachment(attachment)
        })

        trixEditor.insertHTML(parentEl.innerHTML)
    })
})
