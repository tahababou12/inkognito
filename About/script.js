var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});

const slideData = [
{
  index: 0,
  headline: 'New Fashion Apparel',
  // button: 'Shop now',
  src: './profile.jpeg' },

{
  index: 1,
  headline: 'M5 Commendation Award (05/2018)',
  // button: 'Book travel',
  src: 'assets/img/awards/midshelf.png' },

{
  index: 2,
  headline: 'QuickLang - Recognition Award (07/2019)',
  // button: 'Listen',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg' },

{
  index: 3,
  headline: '2nd place in Morocco’s National Golf Tournament (05/2017)',
  // button: 'Get Focused',
  src: 'assets/img/awards/golf1.png' },

{
  index: 4,
  headline: 'MUN Award - Arnhem, Holland BIGMUN (10/2018)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },


{
  index: 5,
  headline: 'MUN Award - Copenhagen, Denmark BIGMUN (04/2018)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },

{
  index: 6,
  headline: 'M5 Commendation Award (05/2018)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },

{
  index: 7,
  headline: 'MUN Award - SotoMUN (04/2018)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },

{
  index: 8,
  headline: 'M5 Commendation Award (12/2017)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },
  

{
  index: 9,
  headline: 'M5 Commendation Award (10/2017)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },

{
  index: 10,
  headline: '9th-grade Citizenship Award (06/2017)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg' },
  

{
  index: 11,
  headline: '9th-grade Renaissance Award (06/2017)',
  // button: 'Get Focused',
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg' }];


// =========================
// Slide
// =========================

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty('--x', 0);
    this.slide.current.style.setProperty('--y', 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const { src, button, headline, index } = this.props.slide;
    const current = this.props.current;
    let classNames = 'slide';

    if (current === index) classNames += ' slide--current';else
    if (current - 1 === index) classNames += ' slide--previous';else
    if (current + 1 === index) classNames += ' slide--next';

    return /*#__PURE__*/(
      React.createElement("li", {
        ref: this.slide,
        className: classNames,
        onClick: this.handleSlideClick,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave }, /*#__PURE__*/

      React.createElement("div", { className: "slide__image-wrapper" }, /*#__PURE__*/
      React.createElement("img", {
        className: "slide__image",
        alt: headline,
        src: src,
        onLoad: this.imageLoaded })), /*#__PURE__*/



      React.createElement("article", { className: "slide__content" }, /*#__PURE__*/
      React.createElement("h2", { className: "slide__headline" }, headline), /*#__PURE__*/
      React.createElement("button", { className: "slide__action btn" }, button))));



  }}



// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
  return /*#__PURE__*/(
    React.createElement("button", { className: `btn btn--${type}`, title: title, onClick: handleClick }, /*#__PURE__*/
    React.createElement("svg", { className: "icon", viewBox: "0 0 24 24" }, /*#__PURE__*/
    React.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }))));



};


// =========================
// Slider
// =========================

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 1 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ?
      this.props.slides.length - 1 :
      previous });

  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ?
      0 :
      next });

  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index });

    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)` };


    return /*#__PURE__*/(
      React.createElement("div", { className: "slider", "aria-labelledby": headingId }, /*#__PURE__*/
      React.createElement("ul", { className: "slider__wrapper", style: wrapperTransform }, /*#__PURE__*/
      React.createElement("h3", { id: headingId, class: "visuallyhidden" }, heading),

      slides.map(slide => {
        return /*#__PURE__*/(
          React.createElement(Slide, {
            key: slide.index,
            slide: slide,
            current: current,
            handleSlideClick: this.handleSlideClick }));


      })), /*#__PURE__*/


      React.createElement("div", { className: "slider__controls" }, /*#__PURE__*/
      React.createElement(SliderControl, {
        type: "previous",
        title: "Go to previous slide",
        handleClick: this.handlePreviousClick }), /*#__PURE__*/


      React.createElement(SliderControl, {
        type: "next",
        title: "Go to next slide",
        handleClick: this.handleNextClick }))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Slider, {heading: "Example Slider", slides: slideData }), document.getElementById('app'));