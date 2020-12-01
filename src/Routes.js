import WritingForm from './views/components/WritingForm.js'
import LinkList from './views/components/LinkList.js'
import About from './views/pages/About.js'

const Routes = {
    '/'         : WritingForm
    , '/links'  : LinkList
    , '/about'  : About 
};

export default Routes;