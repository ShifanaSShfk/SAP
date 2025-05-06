import React, { useState } from "react";
import axios from "axios";

const AdminExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/api/admin/upload-excel", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data);
    } catch (err) {
      setMessage("Upload failed: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-upload">
      <h2>Upload User Excel</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminExcelUpload;
