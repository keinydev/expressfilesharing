let About = {
    render : async () => {
        let view =  `
            <section class="flex-center margin">
                <h3> About </h3>
                <p>This is an intermediate service to upload or create your own file, to share, or find out using <a href="https://www.file.io/" target="_blank"> File.io </a> API 😉</p>
                <a href="https://github.com/keinydev/expressfilesharing" target="_blank"><span class="badge"> GITHUB</span></a>
            </section>
        `
        return view
    },
    after_render: async () => {}
        
}

export default About;