import { defineStore } from 'pinia';
import roundedStamp from '../assets/images/rounded_stamp.png';
import squareStamp from '../assets/images/square_stamp.png';

// pdf.js
// eslint-disable-next-line no-undef
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

// eslint-disable-next-line import/prefer-default-export
export const useUploadStore = defineStore('useEdit', {
  state: () => ({
    pdfFile: null,
    fileName: '',
    ReName: '',
    finalFile: null,
    tagsHistory: ['一般', '緊急', '機密'],
    tags: [],
    signatures: [],
    images: [roundedStamp, squareStamp],
    chosenSign: null,
  }),
  actions: {
    upload(event) {
      if (event.target.files[0] === undefined) {
        return;
      }

      // 超過10m 警示toast跳出
      // 透過 input 所選取的檔案
      const file = event.target.files[0];
      const { name } = file;
      // 產生fileReader物件
      const fileReader = new FileReader();

      // ----暫時刪去
      // 是FileReader的方法，將資料讀取blob檔，當讀取完畢，會回傳loadend事件 (MDN )
      fileReader.readAsArrayBuffer(file);
      // -----

      // 綁入事件監聽
      // 一但fileReader 完成加載後load後就可以顯示，return fileReader
      fileReader.addEventListener('load', () => {
        // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF const
        // 將上方blob檔轉成 8進位制，存進pinia
        const typedarray = new Uint8Array(fileReader.result);
        // const typedarray = fileReader.readAsDataURL(file); // 這樣傳出的是null
        this.pdfFile = typedarray;
        this.fileName = name;
      });
    },
  },
});
