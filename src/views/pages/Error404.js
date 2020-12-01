let Error404 = {

    render : async () => {
        let view = `
            <section class="">
                <h3> 404 Error </h3>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;