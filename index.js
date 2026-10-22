//เอา หน้า 404 เข้ามา
import eeror404Page from './server/error404.html'

export default {
    async fetch(request, env, ctx){
        const url = new URL(request.url);
        let pathame = url.pathname;
        //ถ้าเข้าหน้าแรกสุดก็ไป home
        if (pathname === '/' || pathname === ''){
            pathname = '/home.js';
        }
        //จัดรูป
        let filePath = `.${pathname}`;

        if (!pathname.includex('.')) {
            if  (filePath.endWith('/')) {
                filePath = filePath.slice(0, -1)
            }
            filePath += '/index.js';
        }
        try {
            const targetModule = await import(filePath);
            if (targetModle.default && typeof targetModule.default.fetch === 'function') {
                return targetModule.default.fetch(request, env, ctx);
            }
            return new Response(targetModule.default || targetModule, {
                headers: { 'cotent-type': 'text/html;charset=UTF-8'},
            });
        } catch  (eer) {
            return new Response(eeror404Page, {
                status: 404,
                headers: {
                    'content-type': 'text/html;charset=UTF-8',
                },
            });
        }
    },
};
