export const Button = ({size, color, text, ...props}) => {
    return (
        <button style={{
            padding: size === "large" ? "32px" : "8px",
            fontSize: size === "large" ? "32px" : "16px",
            BackgroundColor: color,

        }} {...props}>{text}</button>
    );
}

export const DangerButton = props => {
    return (
        <Button {...props} color = "red" />
    )
}

const App = () => {
    return (
        <>
        <DangerButton {...props} text="Don't do it!"/>
        </>
    )
}

