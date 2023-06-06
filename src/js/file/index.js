/*
 * Author  Murphy.xie
 * Date  2023-05-24 17:22:29
 * LastEditors  Murphy.xie
 * LastEditTime  2023-05-25 21:32:50
 * Description
 */
export default class FileRead {
	/**
	 * @type FileReader
	 */
	#reader = null;

	constructor() {
		this.#reader = new window.FileReader();
	}

	/**
	 * 终止读取
	 */
	abort() {
		this.#reader.abort();
	}

	/**
	 * file convert arrybuffer
	 * @param {File} file
	 */
	readAsArrayBuffer(file) {
		return new Promise((reslove, reject) => {
			this.#reader.readAsArrayBuffer(file);
			this.#reader.onload = (e) => {
				reslove(e.target.result);
			};
			this.#reader.onerror = (e) => {
				reject(e);
			};
		});
	}

	/**
	 * file convert Binary
	 * @param {File} file
	 */
	readAsBinaryString(file) {
		return new Promise((reslove, reject) => {
			this.#reader.readAsBinaryString(file);
			this.#reader.onload = (e) => {
				reslove(e.target.result);
			};
			this.#reader.onerror = (e) => {
				reject(e);
			};
		});
	}

	/**
	 * file convert base64
	 * @param {Blob} blob
	 */
	readAsDataURL(blob) {
		return new Promise((reslove, reject) => {
			this.#reader.readAsDataURL(blob);
			this.#reader.onload = (e) => {
				reslove(e.target.result);
			};
			this.#reader.onerror = (e) => {
				reject(e);
			};
		});
	}

	/**
	 * file convert text
	 * @param {Blob} blob 流
	 * @param {Blob} encoding 编译
	 */
	readAsText(blob, encoding) {
		return new Promise((reslove, reject) => {
			this.#reader.readAsText(blob, encoding);
			this.#reader.onload = (e) => {
				reslove(e.target.result);
			};
			this.#reader.onerror = (e) => {
				reject(e);
			};
		});
	}

	/**
	 * @param {FileReader} t
	 * @param {ProgressEvent} ev
	 */
	set onabort(abortCallback = (t, ev) => {}) {
		this.#reader.onabort = abortCallback;
	}

	/**
	 * @param {FileReader} t
	 * @param {ProgressEvent} ev
	 */
	set onerror(abortCallback = (t, ev) => {}) {
		this.#reader.onerror = abortCallback;
	}

	/**
	 * @param {FileReader} t
	 * @param {ProgressEvent} ev
	 */
	set onload(abortCallback = (t, ev) => {}) {
		this.#reader.onload = abortCallback;
	}

	/**
	 * @param {FileReader} t
	 * @param {ProgressEvent} ev
	 */
	set onloadend(abortCallback = (t, ev) => {}) {
		this.#reader.onloadend = abortCallback;
	}

	/**
	 * @param {FileReader} t
	 * @param {ProgressEvent} ev
	 */
	set onloadstart(abortCallback = (t, ev) => {}) {
		this.#reader.onloadstart = abortCallback;
	}

	/**
	 * @param {FileReader} t
	 * @param {ProgressEvent} ev
	 */
	set onprogress(abortCallback = (t, ev) => {}) {
		this.#reader.onprogress = abortCallback;
	}
}
