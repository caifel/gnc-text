import React from 'react'
import PropTypes from 'prop-types'
class GncText extends React.Component {
    static propTypes = {
        ellipsizeMode: PropTypes.oneOf([
            'head', 'middle', 'tail'
        ]),
        tag: PropTypes.oneOf([
            'span', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 'ins', 'sub', 'sup'
        ]),
        numberOfLines: PropTypes.number,
        selectable: PropTypes.bool
    }
    static defaultProps = {
        ellipsizeMode: 'tail',
        tag: 'span',
        selectable: true
    }
    constructor(props) {
        super(props);
        const me = this;
        me.el = null;
    }
    ellipsis = () => {
        const me = this;
        const text = me.el.textContent.trim();
        const numberOfLines = me.props.numberOfLines;
        const size = text.length;        
        let currentNumberOfLines = 0;
        let fullSpeed;
        let halfSpeed;
        let initialHeight;
        let initialNumberOfLines;
        let lettersIn = 0;
        let rowHeight;        
        const getCurrentNumberOfLines = () => {
            return Math.round(
                (me.el.offsetHeight - initialHeight) / rowHeight
            ) + 1;
        }
        const update = () => {
            switch(me.props.ellipsizeMode) {
                case 'tail':
                    me.el.textContent = text.substring(0, lettersIn) + '...'; // innerHTML
                    break;
                case 'head':
                    me.el.textContent = '...' + text.substring(size - lettersIn, size);
                    break;
                default:
                    me.el.textContent = text.substring(0, Math.floor(lettersIn / 2)) + 
                    '...' +
                    text.substring(size - (Math.ceil(lettersIn / 2)), size);
                    break
            }            
            currentNumberOfLines = getCurrentNumberOfLines();
        }
        // Getting the 'initialHeight'        
        me.el.innerHTML = '<br/>';
        initialHeight = me.el.offsetHeight;
        // Getting the 'rowHeight'
        me.el.innerHTML += '<br/>';
        rowHeight = me.el.offsetHeight - initialHeight;      
        // Getting values that will be used for optimization
        me.el.textContent = text;
        initialNumberOfLines = getCurrentNumberOfLines();
        fullSpeed = Math.floor(size / initialNumberOfLines);
        halfSpeed = Math.floor(fullSpeed / 2);
        // Determine if is or not needed to start the proccess        
        if (!numberOfLines || initialNumberOfLines <= numberOfLines)
            return;
        // Filling at Full Speed
        while (currentNumberOfLines < numberOfLines) {
            lettersIn += fullSpeed;
            update();
        }
        // Filling at Regular Speed
        while (currentNumberOfLines === numberOfLines) {
            lettersIn += halfSpeed;
            update();
        }
        // Correcting Slowly, because in this final stage we need full precision
        while (currentNumberOfLines > numberOfLines) {
            lettersIn -= 1;
            update();
        }
        // Setting the title, <new features can be added for this>.
        me.el.setAttribute('title', text);
    }
    initialize = () => {
        const me = this;
        me.ellipsis();
        me.el.onselectstart = () => me.props.selectable;
    }
    componentDidUpdate () {
        const me = this;
        me.initialize();
    }
    componentDidMount () {
        const me = this;
        me.initialize();
        // window.addEventListener('resize', me.initialize);
        // There is still an issue with the resize, the complete text is not being considered.
    }
    componentWillUnmount() {
        const me = this;
        // window.removeEventListener('resize', me.initialize);
    }
    render () {
        const me = this;
        const {
            ellipsizeMode,
            numberOfLines,
            selectable,
            style,
            tag,
            ...others
        } = me.props;
        const CustomTag = `${tag}`;
        return <CustomTag            
            ref={ el => me.el = el }
            style={{
                ...style,
                cursor: selectable ? 'text' : 'default',
                wordBreak: 'break-all'
            }}
            { ...others }
        />
    }
}

export default GncText;