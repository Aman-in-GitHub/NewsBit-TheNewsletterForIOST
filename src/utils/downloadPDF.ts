export const downloadPDF = async (fileUrl: string, downloadName: string) => {
  try {
    const sanitizedDownloadName = (downloadName || "pdf_download").replace(
      /[^\p{L}\p{N}\p{M}\p{S}\p{P}\p{Zs}]/gu,
      "",
    );

    const response = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileUrl, sanitizedDownloadName }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${sanitizedDownloadName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log("File downloaded successfully");
    } else {
      console.log("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
