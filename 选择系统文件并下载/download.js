/**
 * ArrayBuffer 转 base64 编码的字符串
 * */
function ArrayBufferToBase64 (buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * desc: base64转文件并下载
 * @param base64 {String} : base64数据
 * @param fileName {String} : 文件名
 * @param fileType {String} : 要导出的文件类型png,pdf,doc,mp3等
 * @param fileHeader {Boolean} 定义文件头
 */
function downloadBase64File (base64, fileName, fileType, fileHeader) {
  // 定义base64 头部文件类型,拼接最终的base64
  if (fileHeader) {
    base64 = ('data:application/' + fileType + ';base64,' + base64);
  }

  console.log(base64)
  // 转成blob对象
  let blob = base64ToBlob(base64, fileType)

  // 下载文件
  downloadExportFile(blob, fileName, fileType)
}

/**
 * desc: base64对象转blob文件对象
 * @param urlData  ：数据的base64对象
 * @param type  ：类型 png,pdf,doc,mp3等;
 * @returns {Blob}：Blob文件对象
 */
function base64ToBlob (urlData, type) {
  let arr = urlData.split(',');
  let array = arr[0].match(/:(.*?);/);
  let mime = (array && array.length > 1 ? array[1] : type) || type;
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime
  });
}

/**
 * desc: 下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 * @param fileType  ：文件类 word(docx) excel(xlsx) ppt等
 */
function downloadExportFile (blob, fileName, fileType) {
  let a = document.createElement('a');
  let href = blob;
  if (typeof blob == 'string') {
    a.target = '_blank';
  } else {
    href = window.URL.createObjectURL(blob); //创建下载的链接
  }
  a.href = href;
  a.download = fileName + '.' + fileType; //下载后文件名
  document.body.appendChild(a);
  a.click(); //触发点击下载
  document.body.removeChild(a); //下载完成移除元素
  if (typeof blob != 'string') {
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
}