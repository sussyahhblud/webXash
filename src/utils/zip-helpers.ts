const getZip = (
  zipName: string,
  zipPath: string,
  progressCallback: (progress: number) => any,
): Promise<ArrayBuffer> => {
  return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    // Check if zipName is an absolute URL (starts with http:// or https://)
    const path = zipName.startsWith('http') ? zipName : './' + zipPath + zipName;
    req.responseType = 'arraybuffer';

    // Run callback on progress events
    req.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        progressCallback(progress);
      }
    };

    req.onload = () => {
      const arrayBuffer = req.response;
      resolve(arrayBuffer);
    };

    req.onerror = () => reject();
    req.open('GET', path);
    req.send();
  });
};


export { getZip };
