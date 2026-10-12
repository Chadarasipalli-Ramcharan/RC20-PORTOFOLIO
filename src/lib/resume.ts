import { personal } from "../data/personal";

export function openResume(): void {
  window.open(personal.resumeFile, "_blank", "noopener,noreferrer");
}

export function downloadResume(): void {
  const ext = personal.resumeFile.split(".").pop() || "pdf";
  const a = document.createElement("a");
  a.href = personal.resumeFile;
  a.download = `Chadarasipalli_Ramcharan_Resume.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}