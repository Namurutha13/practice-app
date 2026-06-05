import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  originalImage: string = '';
  compressedImage: string = '';

  // 1. Inject ChangeDetectorRef into the constructorpm
  constructor(private cdr: ChangeDetectorRef) {}

 compressImage(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  const originalSizeKB = file.size / 1024;
  console.log('Original Size:', originalSizeKB.toFixed(2), 'KB');
  console.log('Original Base64:', this.originalImage);

  const reader = new FileReader();

  reader.onload = (e: any) => {
    this.originalImage = e.target.result;

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      const MAX_WIDTH = 400;
      const scale = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      this.compressedImage = canvas.toDataURL('image/jpeg', 0.3);
      this.cdr.detectChanges();
      const compressedSizeKB =
        (this.compressedImage.length * 3) / 4 / 1024;

      const savedKB = originalSizeKB - compressedSizeKB;
      const compressionPercent = (savedKB / originalSizeKB) * 100;

      console.log('Compressed Size:', compressedSizeKB.toFixed(2), 'KB');
      
      console.log('Compressed Base64:', this.compressedImage);
    };

    img.src = this.originalImage;
  };

  reader.readAsDataURL(file);
}
}