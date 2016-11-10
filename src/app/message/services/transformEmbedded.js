angular.module('proton.message')
.factory('transformEmbedded', (authentication, embedded) => {
    const EMBEDDED_CLASSNAME = 'proton-embedded';
    const wrapImage = (img) => angular.element(img).wrap('<div class="image loading"></div>');

    return (html, message) => {

        const images = [].slice.call(html.querySelectorAll('img[proton-src]'));
        const user = authentication.user || { ShowEmbedded: 0 };
        const show = message.showEmbedded === true || user.ShowEmbedded === 1;

        images.forEach((image) => {
            const src = image.getAttribute('proton-src');
            const attachment = embedded.getAttachment(message, src);

            if (!image.classList.contains(EMBEDDED_CLASSNAME)) {
                image.classList.add(EMBEDDED_CLASSNAME);
            }

                console.log('>>> Should we display embedded', show, message.showEmbedded)
            // check if the attachment exist before processing
            if (attachment && Object.keys(attachment).length > 0) {
                if (show) {
                    image.setAttribute('data-embedded-img', src);
                    !image.parentElement.classList.contains('loading') && wrapImage(image);
                    image.removeAttribute('src');
                } else {
                    message.showEmbedded = false;
                    image.setAttribute('alt', attachment.Name);
                }
            }
        });

        return html;
    };
});
