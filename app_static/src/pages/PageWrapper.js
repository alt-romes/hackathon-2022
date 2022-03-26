import Header from "../components/Header"
export default function PageWrapper({ props }) {


    return (
        <>
            <Header />
            {props}
        </>
    )
}