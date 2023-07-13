import styles from './Container.module.css';

function Containers(props){
    return(<div className={`${styles.container} ${styles[props.customClass]}`} >
        {props.children}
    </div>)
}

export default Containers