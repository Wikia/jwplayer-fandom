import { Player, Embedder, WirewaxPluginOptions, OverlayShowEmbedderEventData, OverlayHideEmbedderEventData, HotspotClickEmbedderEventData, SeekedEmbedderEventData } from 'types';
declare class FandomWirewaxPlugin {
    isPlayerRegistered: boolean;
    rootId: string;
    options: Record<string, unknown>;
    player: Player;
    autoPlay: boolean;
    embedder: Embedder;
    vidId: string;
    container: HTMLElement;
    animationId: number;
    setWIREWAXCurrentTime: () => void;
    constructor(rootId: string, options: WirewaxPluginOptions);
    setupEmbedder(): Promise<void>;
    registerEvents(): void;
    startTimeUpdate(): void;
    stopTimeUpdate(): void;
    JWPlayHandler: () => void;
    JWPauseHandler: () => void;
    JWSeekHandler: (event: Record<string, number>) => void;
    WirewaxPlayHandler: () => void;
    WirewaxPauseHandler: () => void;
    WirewaxSeekedHandler: (event: SeekedEmbedderEventData) => void;
    WirewaxHotspotClickHandler: (event: HotspotClickEmbedderEventData) => void;
    WirewaxOverlayShowHandler: (event: OverlayShowEmbedderEventData) => void;
    WirewaxOverlayHideHandler: (event: OverlayHideEmbedderEventData) => void;
}
export default FandomWirewaxPlugin;
