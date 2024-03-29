import ReactQuill from "react-quill";
// import "../styles/CrearPost.css";

export default function Editor({ value, onChange, selectedFont }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      [{ size: ["small", false, "large", "huge"] }], // Agregar opciones de tamaño de letra
      [{ font: [] }],
    ],
  };
  return (
    <div className="content">
      <div className="placeholder"></div>
      <ReactQuill
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        style={{ fontSize: "16px", fontFamily: "Arial" }}
        selectedFont={selectedFont}
        placeholder="Escribe algo"
      />
    </div>
  );
}
