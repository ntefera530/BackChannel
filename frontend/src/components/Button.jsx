function Button ({children,  ...rest}){
    const classes = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    return (
        <button>
            {children}
        </button>
    )
}

export default Button;