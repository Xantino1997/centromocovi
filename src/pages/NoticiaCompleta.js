import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/NoticiaCompleta.css";

const NoticiaDetalle = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET a la ruta /post/:postId en tu API
    fetch(`http://localhost:4000/post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Error al obtener la noticia:", error);
      });
  }, [postId]);

  if (!post) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="NoticiaCompleta">
      <h1 className="titulo">{post.title}</h1>
      <img src={post.profilePicture} alt="Portada" className="portada" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="compartir">
        <button>
          <img
            src="https://w7.pngwing.com/pngs/561/460/png-transparent-fb-facebook-facebook-logo-social-media-icon.png"
            alt="Compartir en Facebook"
          />
          Compartir en Facebook
        </button>
        <button>
          <img alt="Compartir en WhatsApp" />
          Compartir en WhatsApp
          src="data:image/jpeg;base64,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"
        </button>
        <button>
          <img alt="Compartir en Instagram" />
          Compartir en Instagram
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEUYnQ7////z8/Pr6+vl5eXk5OTm5ub6+vrj4+P7+/v39/fv7+8AmQAAlgAAlAAAmADq5+rw6/D/+//08PT38fft6e339PeOxYwnoCFntWT6/fqo0aa627mGwISXyJVzuXCt0qxApjzw9u85pTTi7+FeslvJ3sjc5dvO5M3F4MTR4dBSrk5GqUKWx5Tq8+nS5tFvuWx7vHnX4Naz0rKCwIC/1r6r0qlhsl6dxpyPvo4zpiy73LkkoR2u1q3p9ujm6+XI2Mj6tSugAAAWNElEQVR4nN2daXviug6AcYG2FDt2VqCUpSxlLS1DF26nc7j//1ddB7pAJDtOSOi5kw/T0UPiRFkkv5YsFwghF6Xz0pn8Wzw/L/914nnh33EdeWtY/pBLu5//KvG8cHFxcVUsFs8uLipV+beSh3hRLVarjtxc1w3kiQP5lzjORbWa73m3YqFUKhflSc/KpcuK/HuZuRgI3ybX/zys1uvWU6ex2x47rf+su+NBL/BtQXI576dYkG/qVpZv7oX8W85SFC4hg1Wt8UYti3Ea3ThnFn0fPr08XBNfiJwuQz7D0ofG5YvtDchM9H+9LOuMSVUKuk3+LhUdtqebfC6jcJbDFjgXD81XzmJ0O9STs37rpuoEWV/MzpaWyjvLU7o8VrwsCYdMHmkS7fa1nLcXnhBHX8a3WMrYHzr2Zj20eHLtvrW06q07O7ur2vrDyuWHxuXtDThGvJlbKR5eVEtWuF8QJ5urKhWkx6hKD3Im/15JD5JalIb57umYp3eopDVfVUjl6KuSvlh6i9KHbS3vTG0asSRfjeYby0i9nY6ctxaOKB1xVTsxE38o7FKNZ/X49pS0hne2ONoflsu7HsBledchSCE6o06mj29PR3bbJSmv6lPcWZry5e67LF8mF/1RIyf9tjryetcuH3GR5WO9BRl1rPz02+rI5s/HeotjOKWW4/P71nE2+CF6IjfZmxdcR6t14f4APQ367CT6bXXk3VPTk0NaOX+AkY3dLpxT0pM9fk+i344G5WbttvC/W2BM0oZ174pT0VMQdCxz5ST+9RutP7/Hg9F2LENu1c1gevOn1pkXtmhs2BR/HyWHq1T05AzMHmCIQ2/LPw/Xnrsdq6hIS7dn8Rzh2w4Z3NRm1FBLajXdU9CTbeQiQtirPZ9vh54+jTjesmtX715emRFS8tuNyJueRPGWx6vH6HJyTYi8pSYtl8PLeqj1DdCL0mc7yTUnp6dgGusD5TvXGhBSTdiyS8ii2Y9/Pay2myM9lbxmjImRL+frKrzLqZAnsKetQpySfLg5N285oT/0O3onT9lb98wW5SOQR5BxI8bT0veRa+4PE9HT5lZ7amrNJseB2IfY61jab53yO+OWk9CTGL3pFKRWZ0DEMSC2J1ba+s/d6trZ05PQ2hjKhotMh+3IvdawspqdNT25d7oXh812Q4AZxo9E8Ulnc1iLmDRlTk/kWWNE+fudl0P8yN08agwbX5Is6UloFKSs7TuaY48Q7ee6+s3hr3Z29ORrFGTDkX+Me9CKwl6rXQdvuFnRU6BWkPLfTinzgNGeSBbqXiJ/JbFNGdFTMFYqyIabzKNF0bM76sfIn5y4w03oSUxV37ukGe88iwiRXvQXBZWKrGUfT09io1SwsCDlzBygVlQSN7vXB6pM6Gmjwl3WyDRuFRPVUqloPWuPNaCnQNUXZW0vo7iVEbUNVF0ca1o9hp5KXgNvmLIxucwibmUsXs8VKtKN0Bwb5w/te9xUU9rLxwHqxFfFtdz66elJ1ZWh7z24c+6is8RtHm146mNj6Ola8YrOj+ejVGIbv+HsxU9JTz5uZegsf/egEBWDKNYoHT3ZLfTFDxX8sWQ81TiRXcaP1dJTdYK2RmdOJe90O3USYICrSIdeGnrCn+A8xzS/ePFC8RTZJEhMTwT1hLR+QveAizX0zvPNeUJ6Eug7Sul15nyUWMRv/cxPSk+oGeW5w5LB5sywa+M36KWp6ekRa8Uak1z4KKlYR1VMRk8P2DtqNf8NyelS7GGdG/qYiJ4wZOLLE+KSXkRHHayHqjE9BW3EXtG3JEGfnGEKvcA6MaanBfYWWL2SnnGEH/aAAyGEg/yasYhZG3YDd1b4wyVyuHUT47WKq878rdF5Wr80J3E+7XjxGvOKHO6M09MCecvld6xnnC7/TsdnbJA7TGGfIq+Z0ZM9xIxxUcs4l/3De2r90uyciWhjLxr7ZUJP4g75CtlE6Ix4NeqhZPc1d+eBPAba8gn0FlFOsZGPmC49HdRcQxdsPeQNUwHWr2Sjw51ResIeIb/SQE0FUVDeE5I3TGH9LtohsfTkIV8h74pdpxaFGr+PdoWLucPUOWJP2SiWnqbw2dNbVxNdcl7xTvoqr6lMX6KP+H26tEv7O0N68jvweq3puQZqXhQjYEM/d5hy69i7E0NPiC+kj7oIz0A53r7JCpeUW4DYDN48oChIT23kES6+foVQYyszUGgzf9TykIHwegw9YVbRUfsl0VWHoeskf5hCHiKbODp6miBHbNQUc2G/KxUssGkpd5hCnDcdEg09ecgBLaJJt/utyUGhNZI7TDmIGWAbDT39go9QfoVqivG0eWD0cOd8YAqOS9H23s5Rf1iDu3d0fkkZAN/dzMkJBhcf4CXU9/1hhJ4QQzrQUIyAd+Tg7jTyDEV9itASsLGKnhCqoDNbRzHaXL7wi8g/MiWgKaAdX0FPfgtcMLsTujGvuHzapjjB0BvSdbMV9GQjnSCio5hJTMo3ndv50dOXCD8V9ixweoJ2g9YcDcUgbUc22XPLPzIFHQZtuTg9wR6bNdVRjI8OjB+cqq0ICWUpQpdF+wp6ApxHb22d1fY0HZrPLcg/MiWQJ7PA6KkC7Ya0FDqKsePngPBnkX9kagQuXAIGQk/BCtgNSw8vcaY0vEeN2Ny64zcHEAadfZ52n55cMDwXDpjpKMZAw4KlODZTET4bfkEgPcGvShKe1hGZaMhXJ4hMQWwPuzWAnjZwt4GeYkw0DMfKcw9FEeDIeZMAeqo+w95PoKcYeE8QDYfuKUJR4AOTp43SE+xFy+6dlmIuPZNZei2RLz2FYnUM+yo2oCcXGCR+I/SOyMQfspE4RaYG/MJGgJ6K0Fdcx1CMiO3ThO/BSfL6oL9YiSg9DcCDrtskhmKQgbnorVyojs1UFICKQtCP0BPALNoRcWY6ji0KrBvk4h7AkB/wiHQI6Oke3IW1IDEUcx1jTPmjdwJ6CsURNDVReiIgIMPvYimGvGkVpEPvVHl90KxbvQg9+cAuWr1YihFP2qG2me7YjEUQHuLPpUN68uEoW7yZFrCXsHd8oZqje4iKwJt/RAS/6Qm8yOETiKUYV/0MKR3lHnvaE6GhbItDegIjGLRjkKQXKF9T+t47ZZIfjELR5fb83/Q0Ru5BPLZU1HOieqfN64Pv4GOEnv4ADbsm9Rmw4bnd0fk6QCD6UcdFbyP0tIa2SBhQjCq6Zm3ij81SLNvwJh/Skws+KDaomFCMg2vIFifO60N6ptUDevJBCIddm1EMliUYfsV68spehAqMDujJBh7TMvVLuK3hoxPnuYNRJj7devxPevLhQyaGFKN4iB37Mk9cAiKgCzYNo/Pf9AQ6bXXbjGLKeM57yE2nnBUFhyjY4JCekOFuQ6sddNH3VPaJTuktxAt8htUDegIO89U3phg060uyoTZulbEINeTT6j49gYEO+uqaUoyDJvaH6X75Zu4diFWo4Y27T08eeIYNYkwxNj5eEw6Vnm5WFOyUrbaW5tNb4BqaWu2NomNzikyFT1Gl4Sc9eeAt3T1DM4rBJ0nJT7F3ullRKg0/6QN0vuhrEvhxFO/p7ASRp90WdOEozNXZPj3BMKqfhGIUhRf4vRN/bCaigOggbek+PUEKMvWHW1E0cRWtcV4OMEpPsE8zqB7QExhqo145CcVg+e/bO3l9EnpCBsWsfw7pCel5J6KYCjYNJbxRb8Fp6An0vNkoOKAnoKG0g8koZq0oefBqn4SegK2L0BMc+Lf+SeiXlO/pE8nFAUZEmEgiDmJPiCkaJ6UYVSEb1ow/9ngRvjz+YewJjLfwF5GUYlRFZFjbzp2eiqBTdhuJPT0Al1/zE1ttZCbDTsV1hktW4CLI/d1Nmt2jJxA+DGObX78aUgw+BXmrolFTgemJoAjiC7R1GHuCxp72g+QUA4Ncnyq246dBVd27SY+4qejJBfBE1yQSewJ3n6ehGGU9J9ax447t9Rm35hOzE0VF4Av4ShzGnmwQCrQWqWJAqmgUH57FHLutWUZZ/YbEZEhgIgx/TiOxJxuON45TUYzCK4ZTrXuaY8vep8uWOq5cbcYgJsIs2k0kcw9JummmCx4p645Sa6KGKef++xOm/G2VcOUnxADszrWXuXcDjNGj//2rOdQEmlww1lHC1CFDU95/9krm50UyFR5JNHMP9pxpSiemLrMoDfQCPxZkMlM2G2vmW0VzMQBZSFMKMveAiWBTkg5qNCWxqdUmSG2HHlYigb32DM97Ae1k2OmMZO65wETQbsoyEV5NVzv2fUoiUa3KFf7tUmu5CUs2xZ8XfhlsZJK517BL6aCGdHQZDNZjL3KsqpxeuOSDyXmrIIKNZe4JWAqZVlNDTUOXLSWvu+jv7ax0MOG+vBvvHl34dF59OO/pCuaD34nUUIPWZdi77nbR/dhZfzfC13plC/15PTA7ia4FnPfkQYZsp4caX/dgwrZp7Xw3O2kZu9YC7z8Q7XmRLOiH3a8H855goJv200NNSfvubVtnrXPpDxTFEA93tWpF3XlBt7vAK4RE6ImQKjIboXdMSChOxdDnNQzXYLFWQnNe+PYNd12LyLwnOAohX9MjQkKqcpz7JzDTT+745CpPhE18agbovCdotOv+96/JocYzeQMNNWypT4TM87R6+LynJjL98LghsHvjNYXiNGyrTwSzlujt9yzZg6oRyMSnpfv1a6qQkJKIk2r4ojxRGc4ElvcDrxrhwEmvNDk9HWzBOJu15xQV9bangMWG2PTr18OqEcg0N34jjosQBT08yp9wYyOhOFEZzkQoFFxV1QhkEmnfO3rMT7eGg+lGXdWJBMznoS3/YB7w3rpLNrzf7FkcHSFqHr0IHW34ihMhdka+pF/XHK0agUygCNNijo0QOYt+rGeM0fBFVYDCgZU8ZFdMXTUCmatlDbKIELWOs6nbZE68ZejEw0mFXztHq0bAIJvsTWQSIbpLtJxg9BrmnqplpGgE2+ztHK0aUUaS72X/IIMIUdmvpf8a6dpXtQwtB31193aGNffgdDQ6c75+PSpCtJilNapM2TKkhbBSnLbmXhM9JJMIUcW+q6dam5UrK8NCpt3ame+dkZp7FaQSVmYlyoW7qifv44TnV7SMPEL+O6bmHgxxhA/RySrdLiA3BisAHipYv6qoVqFCWqKHQS5Ycw9OXAg3P7t0O2GPX5PYHFq/LuNNXSK1WAr03o+ruechgVx5WHbpBeUKWdSoaReAz9VNYQ+DFiMVWpGK5VhiDBt9POHEoSiFWOyafZBWTd0UWqSzLeIrljtIzfPsU/AC56ERu7gqL2iiVWj2NYvuhVUsL/3C6td2Rdbpdo69afZ1X2QY41A3VcKSWum9ONwZrVhetrGUCj5KtkytgVg+F86gxhVvK2Wdnq4prAppWFL0cGdFxXL0C567OWXfTZZQScppbeTrjhXYO0rX0blaiorlaHUk1iX5ZN9Je/DQqm/X6Q4vknJm0eVzEFOvD00UfAfZhqqK5VfIK75NXMgr+07Yo26tcUvpW6M9GSw8X7eE01bExkbCCnjRnRUVywM4547e5px9526Njx1CRPzOHhbs2Nafju6sWu/JA4eH5VBOvcCTutYfOk2H/deBO6vWe0JiqtPSsfSUnYh+hLyF7Kxa7ykAo9/0zcs/V9tUxBfaesd2Vq33hJSWuhf5z10yFdH8wJBizdd7guXBrEU29JSBiLr6MH8myXpPMD9qa6Zyn7tkJOJB8XfFsQpvASOOawe12j8g4kulWQNFcT98vSfMkmZMT6kXz8VTdaQdVRyLrveEWNL5yeYv6TcHV5D2ldeH0dMlHMCS7v5nF3j6FBXJVmyjOhalJ2T9X6v3sw7wU1Rk3lgTZaFclJ6Q9K95priUUiwFiswHXiPKY1F6gtPY6PoEdfPixMqVItRKh16y1XKrMHeDbU5U+UEn9hSDOrRQ1R2L+EMXcff2TzrA7UV7E9WIDt0I3bEIPSFVeT+z4H4Ml0quMv7IBkJ7LEJPkEys09TN04jXM9UAsrUS2mMxeoIvad883zoX0Z4oB49Z09Yfi9ETtKRNzXSkkhBn6l+zEEV1qYyQs7Vd0jcF6akCC0Rqqo47ZNO8d5w8cSmYqMPjrObFNgXoCSki+aqCGn/zMmeU16d2Xrh0KYqaZBzWsuObAt4CZqfwF8QQy8970ZxbuxFOqxOmBuTgLQK3q4lssJZXjm8qSk9ltE8aAZNA2NN23/oOWNNtfkf2uPRQ18Tg2L1t0lSUngLYJ42ASRA401o/GjXi75OEE5XiQWnxqAvbWE0zoAP0hFjSg5Q58vxE0aAYe59kikuLjja+aHVto6ai9HQOLansk378KnwyfqLqZArWnxDdch/mopD6aQPhlN35Zk1F6QkBp6Fd3v7qbboNqg/bUlZvF7UBIyNRuKuhPtBP33vCsGWQuQca4yvp7QKvuhrGBmx3Snam3jGoVXWvmnFJN/x245q2HKUn7CUlpNecMeNMH2r1m6Od80iOS0H1uREb3reW9rl5yxF/CKslD4ufbs94o5TPutfhJ5k09jTuaD7zrzv4207iWiP0BJPa3o1eTnAZ3Jq1p/Z+Bp2ej4S9uUFCwUjL9UUy8jqgpxK2AmnajUqz9Lh+Pt9yyaWOj1z7V7e234HQbOzVTVbL4pCefG1l51Racj6v3TwsPDekOEecnwef/mD74LyzfybrIQ0j3EbtscnnkramjueQnjRlj4/Sklm0/1hr3kyep9PBda+3mE6fJzd/2stZgVmGyoUbm10nBrEDenKzfEmBnuHz5Exqa1nyX/n/j8wE8yZYl1SSg9g+PcWvT/WTm/VYSbV01L63QMp9/Ws2/p62fN8ePQno7mO3NJ4kxUbZfZWkBLE9egqQZE39ean11j6BjpQ9XaUns316Sthxkb2zgTRX9znrSNnwF0kPYvv0BBejUZ+VW/PVaFdTwi+u+ZETYnRnsl6ndimJA9TQk6m7l/7t9c+1J744JSDt+O5kOv1YZ+CVjopb7dGTmbuX6i0nZ271kFPc6ipperrBxllt5B0bt/qmp3MDdy+fVOMG5xSHjF8z1VHSdJcEGcStNDX3oqe06q3nqq1ZlONXLcVcCvxcnHfujD2eIT1plzIMOaEtDafsueuwRdh3unEcU/Uom61ETJmI5PQUqC2pPOPb/YC4wiRg5FcnHXwszlA9CZbrTew6UynoyVFY0tAvrH+Zx57K5yIgg+1wcfLJP/LWPE3krcwybvVFTwGaKkatebNn68o1KERv0132LfNnKcHDoq/rqZP0RMb0VH2GU0251Wj2SNqqEVWbXN21O/VQTZ2i8keJj8Nad+C46roQR4if9BR5SaXb2/oFxYQjQ1GE4zQP3dZjn0omDHlwf+NM4u/b7Gk9kfdRiNIRJzKhp30FKeOdVdHOKlVP+GHq9j//XTVfXmqtZefx8alVa6/X3bvBNXFsX+SbE/hBT9+WNPzaxySQfbKMs+9KYvtIA+HvxmhE4qp6x9CT81F3gbL39tgJTrlOU+7b1pZehos7yi++XrsjP56bl7G4oyexYtS6bU49Ebvg4f+duKMnMeuHfuHnc/NyED/oqUeCH0nGO4Gomvf0F4mKTPa/SPz7NfwfXQYjKKgXIsMAAAAASUVORK5CYII="
        </button>
      </div>
    </div>
  );
};

export default NoticiaDetalle;
