import { SubTitle } from 'component/ui/Subtitle';
import { useSearchParams } from 'react-router-dom';

const BlogSUbCategoryTitle = () => {
    const [searchParams] = useSearchParams();
    const item: string = searchParams.get('item') || 'All';

    return (
        <SubTitle>
            <div className="subText">
                <span className="point">{item}</span>
            </div>
        </SubTitle>
    );
};

export default BlogSUbCategoryTitle;
