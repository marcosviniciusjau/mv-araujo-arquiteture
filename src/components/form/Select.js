import styles from './Select.module.css'

function Input({text,name,options,handleOnChange,value}){
return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <select
         name={name} 
         id={name} 
         onChange={handleOnChange} 
         value={value || ''}
         required>
            
        <option> Selecione uma opção</option>
        {options.map((option) => (
         <option value={option.id} key={option.id} required>{option.name}</option>
        ))}
        </select>
    </div>
)
}
export default Input;