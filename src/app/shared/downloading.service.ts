import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DownloadingService {
    // eslint-disable-next-line class-methods-use-this
    public download(fileName: string, ...arrayBuffers: ArrayBuffer[]): void {
        const file = new File(arrayBuffers, fileName, { type: 'audio/wav' });
        const $link = document.createElement('a');

        $link.setAttribute('href', URL.createObjectURL(file));
        $link.setAttribute('download', fileName);

        document.body.appendChild($link);
        $link.click();
        document.body.removeChild($link);
    }
}
