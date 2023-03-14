import MainLayout from "@components/layouts/Main";
import {useParams} from "@solidjs/router";

const GlideDetailScreen = () => {
    const params = useParams();
    return (
        <MainLayout pageTitle="Detail">
            <div>
                id: {params.id}
            </div>
            <div>
                uid: {params.uid}
            </div>
        </MainLayout>
    )
}

export default GlideDetailScreen;