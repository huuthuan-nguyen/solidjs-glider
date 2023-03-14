import MainLayout from "@components/layouts/Main";
import {useParams} from "@solidjs/router";
import {onMount} from "solid-js";
import {getGlideById} from "../api/glide";

const GlideDetailScreen = () => {
    const params = useParams();

    onMount(() => {
        getGlideById(params.id, params.uid);
    })

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