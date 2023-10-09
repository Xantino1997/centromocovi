<<<<<<< HEAD
import Header from "./Header";
import Footer from "./Footer";
// import Form from "./Form";
// import { NoticeAlert } from "./NoticeAlert";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main style={{ padding: '10px', paddingTop: '0px' }}>
      <Header />
      <>
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <hr> para una línea horizontal */}</>
      {/* <NoticeAlert /> */}
      <Outlet />
      <br />
      {/* <Form /> */}
      <Footer />
    </main>
  );
=======
import Header from "./Header";
import Footer from "./Footer";
// import Form from "./Form";
// import { NoticeAlert } from "./NoticeAlert";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main style={{ padding: '10px', paddingTop: '0px' }}>
      <Header />
      <>
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br /> {/* Etiqueta <hr> para una línea horizontal */}</>
      {/* <NoticeAlert /> */}
      <Outlet />
      <br />
      {/* <Form /> */}
      <Footer />
    </main>
  );
>>>>>>> 37c2c2505fb9bb7e0a2143406f03857d08b97dfd
}