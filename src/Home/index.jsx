import { useEffect, useRef, useState } from 'react';
import './style.css';
import videoFile from '../assets/eu.mp4'; // Caminho do vídeo
import FotoFile from '../assets/igor.png';

function Home() {
  const containerRef = useRef(null);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('sobre');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.dataset.index;
          if (entry.isIntersecting) {
            setVisibleImages((prev) => [...new Set([...prev, index])]);
          } else {
            setVisibleImages((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      {
        root: null,
        threshold: 0.1, // Imagem visível em 10%
      }
    );

    const images = containerRef.current.querySelectorAll('.trabalho img');
    images.forEach((image) => observer.observe(image));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) setActiveSection(id);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );
    const sections = document.querySelectorAll('main section[id]');
    sections.forEach((sec) => sectionObserver.observe(sec));
    return () => sectionObserver.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/80px-JavaScript-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/80px-React-icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/80px-Python.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/80px-Git_icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/80px-Octicons-mark-github.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/80px-ChatGPT_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/80px-Node.js_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/80px-HTML5_Badge.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/80px-CSS3_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/80px-Typescript_logo_2020.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kali-dragon-icon.svg/80px-Kali-dragon-icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/80px-Visual_Studio_Code_1.35_icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Virtualbox_logo.png",
    "https://tse2.mm.bing.net/th/id/OIP.hn_UYKHsV00r-nwALdbhGwHaEK?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.8rOVj_20ZIWrA9uojIsBfQHaFj?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.JIyxVs8lvTWe9HBftDBnYgHaIl?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://th.bing.com/th/id/R.666da33b368edecc0d671c44070bf61e?rik=XbE2onywYbf%2fhQ&pid=ImgRaw&r=0",
    "https://tse4.mm.bing.net/th/id/OIP.jNZ3dd-GaK9Hr0-enwlQ3gHaE_?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://th.bing.com/th/id/R.3d9083c9dd111661e943f36438d25247?rik=8cIP4OhpgAneeQ&pid=ImgRaw&r=0",
    "https://tse1.mm.bing.net/th/id/OIP.anm4ZZm_QzLXHdgAUM8wwgHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://www.svgrepo.com/show/374118/tailwind.svg"

  ];

  return (
    <>
      <header className="header">
        {/* Vídeo de fundo */}
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>

        {/* Menu */}
        <nav
          className={`menu ${isMenuOpen ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}
          aria-label="Navegação principal"
        >
          <div className="menu-inner">
            <a className="brand" href="#" onClick={closeMenu}>Igor Ramalho</a>
            <button
              className="menu-toggle"
              aria-expanded={isMenuOpen}
              aria-controls="primary-menu"
              aria-label="Abrir menu"
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
            <ul id="primary-menu">
              <li>
                <a
                  href="#sobre"
                  className={activeSection === 'sobre' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#linguagens"
                  className={activeSection === 'linguagens' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Linguagens de Programação
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  className={activeSection === 'projetos' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className={activeSection === 'contato' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <h3 className="typing-effect">Seja bem-vindo ao meu site 😁</h3>
      </header>

      {/* Corpo */}
      <main className="corpo">
        <section className="linguagens" id="linguagens">
          <h2 className="titulo-prommaming"><i>Linguagens de Programação que eu utilizo</i></h2>
          <div className="trabalho" ref={containerRef}>
            {images.map((src, index) => (
              <img
                key={index}
                data-index={index}
                src={src}
                alt={`Imagem ${index + 1}`}
                className={visibleImages.includes(index.toString()) ? 'visible' : ''}
              />
            ))}
          </div>
        </section>

        <section className="sobreMim" id="sobre">
          
          <div className='FotoEu'>
            <img src={FotoFile} alt="eu" />
          </div>

          <div className='TextoSobreMim'>
            <h1>Sobre Mim:</h1>
            <p>
              Sou um desenvolvedor web e mobile apaixonado por tecnologia, inovação e o 
              poder da inteligência artificial. Minha missão é transformar ideias em 
              soluções digitais funcionais, intuitivas e de alto impacto.

              Com experiência em desenvolvimento web, aplicativos móveis e integrações 
              com inteligência artificial, utilizo tecnologias avançadas para criar 
              projetos personalizados que atendam às necessidades dos meus clientes.
            </p>
          </div>

        </section>

        <section className='Produtos'  id="contato">
            <h1>Trabalhos que eu faço</h1>
            <div className='imgTrabalho'>
              <img src="https://i.imgur.com/2ciRjDV.png" alt="Trabalho" />
              <img src="https://i.imgur.com/XjXoEJ5.png" alt="Job" />
              <img src="https://i.imgur.com/gtWBI4o.png" alt="Doces" />
            </div>
        </section>

        <section className="Projetos" id="projetos">
          <h1>Projetos</h1>
          <div className="project-grid">
            <article className="project-card">
              <a
                href="https://youtu.be/lNVGkN9Z4UE"
                target="_blank"
                rel="noopener noreferrer"
                className="thumb-link"
                aria-label="Abrir vídeo do Gerenciamento de Produtos no YouTube"
              >
                <img
                  src="https://img.youtube.com/vi/lNVGkN9Z4UE/hqdefault.jpg"
                  alt="Miniatura do projeto Desktop - Gerenciamento de Produtos"
                />
              </a>
              <div className="project-info">
                <h3>Desktop - Gerenciamento de Produtos</h3>
                <p>Aplicativo desktop para cadastro, edição e controle de estoque de produtos.</p>
                <div className="project-actions">
                  <a
                    href="https://youtu.be/lNVGkN9Z4UE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    Ver vídeo
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <a
                href="https://youtu.be/KUSUTSGoymA"
                target="_blank"
                rel="noopener noreferrer"
                className="thumb-link"
                aria-label="Abrir vídeo do Site de Vendas no YouTube"
              >
                <img
                  src="https://img.youtube.com/vi/KUSUTSGoymA/hqdefault.jpg"
                  alt="Miniatura do projeto Site de Vendas"
                />
              </a>
              <div className="project-info">
                <h3>Site de Vendas</h3>
                <p>Loja online com exibição de produtos e fluxo de compra simplificado, com administração do sistema.</p>
                <div className="project-actions">
                  <a
                    href="https://youtu.be/KUSUTSGoymA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button secondary"
                  >
                    Ver vídeo
                  </a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <a
                href="https://youtu.be/IyR1SZfi86M"
                target="_blank"
                rel="noopener noreferrer"
                className="thumb-link"
                aria-label="Abrir vídeo do projeto adicional no YouTube"
              >
                <img
                  src="https://img.youtube.com/vi/IyR1SZfi86M/hqdefault.jpg"
                  alt="Miniatura do projeto adicional no YouTube"
                />
              </a>
              <div className="project-info">
                <h3>Cardapio Digital</h3>
                <p>Projeto demonstrado em vídeo de um cardapio digital para um restaurante</p>
                <div className="project-actions">
                  <a
                    href="https://youtu.be/IyR1SZfi86M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    Ver vídeo
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="rodape">
        <div className='redesSociais'>
          <a href="https://www.instagram.com/cyber_gigor/" target='_blank'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/80px-Instagram_icon.png" alt="instragram" /></a>
          <a href="https://api.whatsapp.com/send?phone=5585997245715" target='_blank'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/90px-WhatsApp.svg.png" alt="Whatsapp" /></a>
        </div>
        <p>© 2024 Igor Ramalho. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default Home;
