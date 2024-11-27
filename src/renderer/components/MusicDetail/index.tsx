import AnimatedDiv from "../AnimatedDiv";
import "./index.scss";
import albumImg from "@/assets/imgs/album-cover.jpg";
import Store from "@/common/store";
import Tag from "../Tag";
import { setFallbackAlbum } from "@/renderer/utils/img-on-error";
import Lyric from "./widgets/Lyric";
import SvgAsset from "../SvgAsset";
import Condition from "../Condition";
import { useTranslation } from "react-i18next";
import {useCurrentMusic} from "@renderer/core/track-player/hooks";

export const musicDetailShownStore = new Store(false);

export const isMusicDetailShown = musicDetailShownStore.getValue;

function MusicDetail() {
  const musicItem = useCurrentMusic();
  const musicDetailShown = musicDetailShownStore.useValue();

  const { t } = useTranslation();


  return (
    <AnimatedDiv
      showIf={musicDetailShown}
      className="music-detail-container animate__animated background-color"
      mountClassName="animate__slideInUp"
      unmountClassName="animate__slideOutDown"
    >
      <div
        className="music-detail-background"
        style={{
          backgroundImage: `url(${musicItem?.artwork ?? albumImg})`,
        }}
      ></div>
      <div
        className="hide-music-detail"
        role="button"
        title={t("music_bar.close_music_detail_page")}
        onClick={() => {
          musicDetailShownStore.setValue(false);
        }}
      >
        <SvgAsset iconName="chevron-down"></SvgAsset>
      </div>
      <div className="music-title" title={musicItem?.title}>
        {musicItem?.title || t("media.unknown_title")}
      </div>
      <div className="music-info">
        <span>
          <Condition condition={musicItem?.artist}>
            {musicItem?.artist}
          </Condition>
          <Condition condition={musicItem?.album}>
            {" "}
            - {musicItem?.album}
          </Condition>
        </span>
        {musicItem?.platform ? <Tag fill>{musicItem.platform}</Tag> : null}
      </div>
      <div className="music-body">
        <div className="music-album-options">
          <img
            className="music-album shadow"
            onError={setFallbackAlbum}
            src={musicItem?.artwork ?? albumImg}
          ></img>
          {/* <div className="music-options">
            <OptionItem iconName='document-plus'></OptionItem>
          </div> */}
        </div>

        <Lyric></Lyric>
      </div>
    </AnimatedDiv>
  );
}

MusicDetail.show = () => {
  musicDetailShownStore.setValue(true);
}

MusicDetail.hide = () => {
  musicDetailShownStore.setValue(false);
}

export default MusicDetail;
