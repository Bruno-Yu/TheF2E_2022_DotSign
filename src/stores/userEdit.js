import { defineStore } from 'pinia';
import { jsPDF as JsPDF } from 'jspdf';
import roundedStamp from '../assets/images/rounded_stamp.png';
import squareStamp from '../assets/images/square_stamp.png';

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
    history: [],
  }),
  actions: {
    upload(event) {
      if (event.target.files[0] === undefined) {
        return;
      }
      // 透過 input 所選取的檔案
      const file = event.target.files[0];
      const { name } = file;
      // 產生fileReader物件
      const fileReader = new FileReader();
      // 是FileReader的方法，將資料讀取blob檔，當讀取完畢，會回傳loadend事件 (MDN )
      fileReader.readAsArrayBuffer(file);
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
    getHistory() {
      // 若沒有該筆local storage的key 會回傳 null
      if (localStorage.getItem('historyFiles') === null) {
        return;
      }
      this.history = JSON.parse(localStorage.getItem('historyFiles'));
    },
    downloadDoc(e) {
      let download = {};
      if (!e?.target?.dataset?.btnDownload) {
        download.file = this.finalFile;
        download.name = this.ReName;
      } else {
        const index = e.target.dataset.btnDownload;
        download = this.history[index];
        // eslint-disable-next-line new-cap
      }
      const pdf = new JsPDF();
      // 設定背景在 PDF 中的位置及大小
      const { width } = pdf.internal.pageSize;
      const { height } = pdf.internal.pageSize;
      pdf.addImage(download.file, 'png', 0, 0, width, height);
      // 將檔案取名並下載
      pdf.save(`${download.name}.pdf`);
    },
    deleteDoc(e) {
      // 注意: 這邊要用小駝峰
      const index = e.target.dataset.btnDelete;
      this.history.splice(index, 1);
      localStorage.setItem('historyFiles', JSON.stringify(this.history));
    },
  },
});
