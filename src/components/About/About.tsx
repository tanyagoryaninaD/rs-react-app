import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/About.css';

export function About(): ReactNode {
  return (
    <>
      <h2>About us</h2>
      <div className="wrapper-about">
        <h3>What is this?</h3>
        <p>
          This website provides a RESTful API interface to highly detailed
          objects built from thousands of lines of data related to Pokémon. We
          specifically cover the video game franchise. Using this website, you
          can consume information on Pokémon, their moves, abilities, types, egg
          groups and much, much more.
        </p>
      </div>

      <div className="wrapper-about">
        <div className="school">
          <h3>School</h3>
          <Link to="https://rs.school/courses/reactjs">
            <img
              src="https://i.ytimg.com/vi/s0BEXi7x2bk/hqdefault.jpg"
              alt=""
            />
          </Link>
        </div>
        <p>
          This project is a training course on React. I study at The Rolling
          Scopes School. This is a great school where you can master all the
          skills you need to work as a Frontend developer.
        </p>
      </div>
      <div className="wrapper-about">
        <h3>Developer</h3>
        <div className="develop">
          <img
            src="https://avatars.githubusercontent.com/u/176940159?v=4"
            alt="Tatsiana Haranina"
          />
          <div>
            <h4>Tatiana Haranina</h4>
            <ul>
              <li>From Mink, Belarus</li>
              <li>
                GitHub:{' '}
                <Link to="https://github.com/tanyagoryaninaD" target={'_blank'}>
                  @tanyagoryaninaD
                </Link>
              </li>
              <li>Discord: @tanyagoryanina._96715</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
