export default function StyledInput(props : any, onChange : any){
    return(
        <div className="flex flex-col mt-1">
            <label htmlFor={props.label} className="text-black ml-3">{props.texto}</label>
            <input className="border border-black py-3 px-5 rounded-3xl text-black" type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}/>
        </div>
    )
}