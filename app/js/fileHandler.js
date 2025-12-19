function processData() {
  const fileInput = document.getElementById("fileInput");
  const textArea = document.getElementById("textInput");
  const file = fileInput.files[0];

  if (file) {
    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "txt") {
      const reader = new FileReader();
      reader.onload = e => parsePNR(e.target.result);
      reader.readAsText(file);
    } 
    else if (ext === "docx") {
      const reader = new FileReader();
      reader.onload = async e => {
        const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
        parsePNR(result.value);
      };
      reader.readAsArrayBuffer(file);
    } 
    else {
      alert("Only TXT and DOCX supported");
    }
  } 
  else if (textArea.value.trim()) {
    parsePNR(textArea.value);
  } 
  else {
    alert("Provide file or text");
  }
}
