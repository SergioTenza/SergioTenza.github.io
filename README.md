# Sergio Tenza López - Personal Landing Page

Landing page profesional y moderna construida con HTML, CSS y JavaScript vainilla.

## 🚀 Características

- ✅ Diseño moderno y responsive
- ✅ Dark theme por defecto
- ✅ Animaciones suaves al scroll
- ✅ Fondo de partículas interactivo
- ✅ Efecto de escritura automática (typewriter)
- ✅ Navegación suave entre secciones
- ✅ Menú móvil optimizado
- ✅ Optimizado para SEO
- ✅ Accessible (WCAG AA)
- ✅ Performance optimizado

## 📁 Estructura del Proyecto

```
SergioTenza.github.io/
├── index.html              # Página principal
├── css/
│   ├── style.css          # Estilos principales (~900 líneas)
│   └── animations.css     # Animaciones y efectos
├── js/
│   ├── main.js            # Funcionalidad principal
│   └── animations.js      # Animaciones al scroll
└── assets/
    ├── images/            # Imágenes optimizadas
    └── icons/             # Iconos SVG
```

## 🎨 Secciones

1. **Hero**: Presentación impactante con animaciones
2. **Sobre Mí**: Biografía profesional
3. **Habilidades**: Grid de tecnologías categorizadas
4. **Proyectos**: Cards con proyectos destacados
5. **Experiencia**: Timeline profesional
6. **Contacto**: Enlaces a redes sociales y email

## 🛠 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Grid, Flexbox y animaciones
- **JavaScript ES6+**: Interactividad y animaciones
- **Google Fonts**: Inter y Fira Code
- **Canvas API**: Fondo de partículas
- **Intersection Observer**: Animaciones al scroll

## 📦 Instalación y Uso

### Desarrollo Local

1. Clona el repositorio:
```bash
git clone https://github.com/SergioTenza/SergioTenza.github.io.git
cd SergioTenza.github.io
```

2. Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

3. Abre http://localhost:8000 en tu navegador

### Personalización

#### Perfil
Edita los datos en `index.html`:
- Nombre y título
- Descripción
- Habilidades
- Proyectos
- Experiencia
- Enlaces de contacto

#### Estilos
Modifica las variables CSS en `css/style.css`:
```css
:root {
    --color-primary: #1a1a2e;
    --color-secondary: #16213e;
    --color-accent-blue: #0f3460;
    --color-accent-orange: #e94560;
    /* ... más variables */
}
```

#### Animaciones
Ajusta la configuración en `js/animations.js`:
```javascript
const config = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    animationDuration: 600
};
```

## 🚀 Deploy

### GitHub Pages

1. Sube los cambios a la rama `main`:
```bash
git add .
git commit -m "Update landing page"
git push origin main
```

2. La página estará disponible en:
   - `https://sergiotenza.github.io/`

### Configuración de GitHub Pages

Asegúrate de que el repositorio tenga configurado GitHub Pages:
1. Ve a Settings > Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Click en Save

## 📊 Performance

La landing page está optimizada para lograr:
- ⚡ Lighthouse Score: >90
- ⚡ First Contentful Paint: <1s
- ⚡ Time to Interactive: <3s
- ⚡ Page load time: <2s

## 🔍 SEO

La página incluye:
- Meta tags optimizados
- Open Graph tags
- Twitter Card tags
- HTML semántico
- Structured data (JSON-LD)
- Alt tags en imágenes

## ♿ Accesibilidad

La página cumple con WCAG AA:
- Navegación por teclado
- Indicadores de focus
- Contrast ratios adecuados
- ARIA labels
- Screen reader friendly

## 📱 Responsive

Optimizado para:
- 📱 Mobile (320px - 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1024px+)

## 🎨 Características de Diseño

- **Glassmorphism**: Efectos de vidrio en cards
- **Gradient Backgrounds**: Fondos con gradientes modernos
- **Smooth Animations**: Animaciones suaves y fluidas
- **Particle System**: Fondo interactivo con partículas
- **Typewriter Effect**: Efecto de escritura automática
- **Scroll Progress**: Indicador de progreso de scroll
- **Parallax**: Efecto parallax en elementos

## 🔧 Browser Support

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Sergio Tenza López**
- Platform Engineer
- Distributed Systems Specialist
- Elche, Valencia, España

## 🔗 Links

- [LinkedIn](https://linkedin.com/in/sergiotenza)
- [GitHub](https://github.com/SergioTenza)
- Email: sergiotenza@gmail.com

## 🙏 Agradecimientos

- Diseño inspirado en las mejores prácticas de UX/UI modernas
- Iconos SVG de Feather Icons y FontAwesome
- Fuentes de Google Fonts
- Animaciones optimizadas con CSS3 y JavaScript

---

Construido con ❤️ y ☕ en Elche, Valencia

## 📊 Información de Deploy

**IP**: 194.164.160.125
**URL**: https://sergiotenza.github.io/
**Status**: ✅ Activo