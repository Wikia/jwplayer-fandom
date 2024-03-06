import { updateRVParam } from './updateRVParam';

const realLifeAdTagUrl =
	'https://pubads.g.doubleclick.net/gampad/ads?output=xml_vast4&env=vp&gdfp_req=1&unviewed_position_start=1&url=https%3A%2F%2Fharrypotter.fandom.com%2Fwiki%2FHarry_Potter%3Ficbm__icFeaturedVideoPlayer%3D1&description_url=https%3A%2F%2Fharrypotter.fandom.com%2Fwiki%2FHarry_Potter%3Ficbm__icFeaturedVideoPlayer%3D1&correlator=2271909701040176&ppid=c445d76e-3ce5-42a9-a012-289c85b8741d&iu=%2F5441%2Fwka1b.VIDEO%2Ffeatured%2Fdesktop%2Fucp_desktop-fandom-wv-article%2F_harrypotter-ent&sz=640x480&cust_params=npa%3D0%26rdp%3D0%26ppid%3Dc445d76e-3ce5-42a9-a012-289c85b8741d%26browser%3DChrome%26adGroup%3D100%2C95%2C90%2C85%26topics_available%3D0%26pa_available%3D0%26ar%3D3%3A4%26dmn%3Dfandomcom%26geo%3DPL%26hostpre%3Dharrypotter%26original_host%3Dfandom%26skin%3Ducp_desktop%26uap%3Dnone%26uap_c%3Dnone%26is_mobile%3D0%26artid%3D13%26kid_wiki%3D0%26lang%3Den%26s0%3Dent%26s0c%3Dent%2Cmovies%26s0v%3Dmovies%26s1%3D_harrypotter%26s2%3Dwv-article%26wpage%3Dharry_potter%26word_count%3D71502%26pv%3D2%26pvg%3D2%26rating%3Desrb%3Ae10%26top%3D1k%26sex%3Dm%2Cf%26bundles%3Dapple_sea_bundle%2Cobi_wan_kenobi_bundle%2Calc21_bundle%2Cvideo_tier_1_and_2_bundle%2Ctop500%2C25_bundle%2Clow_maturity_bundle%2Charrypotter_franchise%2C21_bundle%26fran%3Dharry_potter%26theme%3Dschool%2Cvillains%2Cdragon%2Canimals%2Csliceoflife%2Csports%2Cheroes%2Cpsychological%2Cghost%2Csupernatural%2Clego%2Cwerewolf%2Cmythology%2Ctime%20travel%2Ccats%2Cmagic%2Celf%2Cp_magic%2Cp_psychological%2Cp_werewolf%26gnre%3Dlive-action%2Cwar%2Copenworld%2Cstorytelling%2Cmystery%2Cadventure%2Cpuzzle%2Cfantasy%2Cwestern%2Cdrama%2Caction%2Cmythology%2Cp_drama%2Cp_openworld%26media%3Dmovies%2Cgames%2Cbooks%2Cp_books%26pub%3Dea%2Cwbie%2Cp_wbie%26age%3D35-44%2Cteen%2C13-17%2C18-34%2Ckids%2C45-54%2Cyadult%2C25-34%2Cunder18%2C18-24%26pform%3Dxbox%20series%20x%2Cpsp%2Cps5%2Cpc%2Cps3%2Cxboxone%2Cpsvita%2Cxbox360%2Cmobile%2Cds%2Cwii%2C3ds%2Cps2%2Cps4%2Cswitch%26labrador%3Dconnatix_b%2Cozone_b%2Csticky-off%26AU_SEG%3DAU_AUD_U6JQZL%2CAU_AUD_X86C3Q%2CAU_AUD_XVRZX5%2CAU_AUD_CIIJOI%2CAU_AUD_KET0VH%2CAU_SEG_STREAMER_3%2CAU_AUD_LCRGA6%2CAU_AUD_HKDLY4%2CAU_AUD_XP15WQ%2CAU_AUD_BZ2GUL%2CAU_AUD_MJJ91R%2CAU_AUD_CQK80A%2CAU_AUD_6M53VA%2CAU_AUD_764W9L%2CAU_AUD_5YEFG9%2CAU_AUD_AGIX08%2CAU_AUD_5FRNUS%2CAU_AUD_HCPOAX%2CAU_AUD_N8PMOG%2CAU_AUD_XQI38Q%2CAU_AUD_BX1WDD%2CAU_SEG_PETLOVER%2CAU_SEG_MOVIELOV%2CAU_AUD_YK9RW1%2CAU_AUD_ET3BR3%2CAU_AUD_PP69CH%2CAU_AUD_2VCRGE%2CAU_AUD_UB6ZHG%2CAU_AUD_ZFWJDA%2CAU_AUD_6P3EV0%2CAU_AUD_82IG5Z%2CAU_AUD_3JP9WR%2CAU_AUD_WJYLWE%2CAU_SEG_TRAVELER%2CAU_AUD_2AEAXO%2CAU_AUD_9ALLJC%2CAU_AUD_DUFDR2%2CAU_AUD_0TQA5U%2CAU_AUD_8AM7OE%2CAU_AUD_70JD11%2CAU_AUD_ARWN2O%2CAU_AUD_1R8J8E%2CAU_AUD_K1ZV02%2CAU_AUD_NGMSU1%2CAU_AUD_93OFGT%2CAU_AUD_2HA2X2%2CAU_AUD_FJK166%2CAU_SEG_AGE_18-24%2CAU_AUD_8W289Q%2CAU_AUD_EMIMA7%2CAU_AUD_03FGYD%2CAU_AUD_BIVU6L%2CAU_SEG_AGE_25-54%26li-module-enabled%3Doff%26ids%3D0%26bsc%3D84011001%2C80000200%2C84012005%2C84012007%26abs%3D51002636%2C51001888%2C51002852%2C51002607%26fr%3Dfalse%26b_ias%3DveryLow%26ias-kw%3DIAS_UNSCORED_PG%2CIAS_14277_KW%26adt%3DveryLow%26alc%3DveryLow%26dlm%3DveryLow%26drg%3DveryLow%26hat%3DveryLow%26off%3DveryLow%26vio%3DveryLow%26boi%3DAAAAxxxxxxxxxxxx%26tvp%3D0-1%26vlp%3D0%26vw%3D40%2C50%2C60%2C70%2C80%26src%3Dgpt%26pos%3Dfeatured%26rv%3D1%26player%3Dcnx%26amzniid%3DJMwCqAkJ00RIP4nIhQHf_VIAAAGN-Zm86AMAAAwrBABhcHNfdHhuX2JpZDEgICBhcHNfdHhuX2ltcDEgICARLGrN%26amznp%3Der045c%26amznsz%3D854x480%26amznbid%3Dv_14rg1s0%26amznactt%3DOPEN%26amznExpirationDate%3DFri%20Mar%2001%202024%2011%3A50%3A18%20GMT%2B0100%20(Central%20European%20Standard%20Time)%26audio%3Dno%26ctp%3Dno%26v1%3DZFyg17nO%26plist%3DK21eFFRc%26videoScope%3Dwiki&vpos=preroll&rdp=0&vid_t=10%20of%20YOUR%20Helldivers%202%20Tips%20and%20Tricks&vpa=auto&vpmute=1&sdkv=h.3.624.0&osd=2&frm=0&vis=1&sdr=1&hl=en&afvsz=200x200%2C250x250%2C300x250%2C336x280%2C450x50%2C468x60%2C480x70&is_amp=0&uach=WyJtYWNPUyIsIjE0LjMuMSIsImFybSIsIiIsIjEyMS4wLjYxNjcuMTg0IixudWxsLDAsbnVsbCwiNjQiLFtbIkNocm9taXVtIiwiMTIxLjAuNjE2Ny4xODQiXSxbIk5vdCBBKEJyYW5kIiwiOTkuMC4wLjAiXV0sMF0.&u_so=l&ctv=0&mpt=jwplayer&mpv=8.31.0&us_privacy=1---&gdpr=1&gdpr_consent=CP6ywkAP6ywkACNAHAENAiEsAP_gAEPgACiQg1QkIAAgAEAAQAA0ACgAQgAqADMAGwAcgA-AEAAIoASABLACcAKAAVQAsAC0AGQANIAcgB8AEKAIgAjgBJgCYAJwAUAApQBUAFWALYAvwBhAGKAMoAzABogDYAN8AcgBzgDuAPAAegA-QCAAISARABFACMgEcAR8AkwCUgEsAS8AnACdAFCAKQAVAArQBgADDAGUANGAagBqgDiAHIAPEAeYA9gB-gEDgIOAhABEQCJgEZAI4ASKAkoCTAEqAJaATAAnABOwCfgFIAKyAXWAwADAgGEAMUAaAA04BtADbAG4AOEAcQA6gB7QD9AH8AQKAgwBDYCIgEXgIxARqAkQBJcCWQJaAS8AmIBMoCaQE6AJ3AT-AokBTYCogFXAK_AWGAtQBawC2gFvALhgXkBekC9gL3AX-AwcBhkDEwMUAYyAxsBkADJwGWQMvAzABnYDQAG2gOYAc0A6EB1UDzAPNAeyA98CAIEBwIJgQfAhzBEwETQIzARrAnSEGoQaoJkACgALgAcAB4AFQALgAcABAACQAGQANAAeAA_ACIAEcAJgAUAApABVgC2ALoAYgAzABoADeAHoAPwAhIBEAESAI4ASwAnABgADDAGUANEAcgA9gB-wEHAQgAiIBFgCOAEiAJKATQAnYBPwC6gGKAM-Aa8A2gBuADiAHSAOoAe0BF4CRAEqgJiATKApsBakC8gLzAX0Av8BggDJwGWANVAcEBAECCYEOQI1gTpCDUAA.YAAACHwAAAAA&addtl_consent=1~2822.3116&sdki=445&ptt=20&adk=3968686359&sdk_apis=2%2C7%2C8&omid_p=Google1%2Fh.3.624.0&sid=575500C4-2B72-41EF-BCF8-7F84C176F3FA&a3p=EhsKDGlkNS1zeW5jLmNvbRiV3OXM3zFIAFICCGoSWgoNY3J3ZGNudHJsLm5ldBJAYjcwZDM0ZmJmYTljNTBkNmMyOGM4OGJmYmU5ZjE4NWNhMDJjNDdmZDU2MGNiMGQxMjdmN2E0NzNhNzA0Y2VkNRii3OXM3zFIABLWAQoIcnRiaG91c2USwAFydGhyUkJKaFNnQ0hDcDh3U1FNem9PM3d4eXJ0TDZFQ1RGTEZRNVNjQlpvZ085ZEFsVWlPVTRsUmlGcmkxNDExejdjVXc2RHpIT0dpS2ZwQmVuMHdwYjMvV25jMG9sQnFMN0pGWVdPazhXSzFrRU5HVUJ2dzN1QkR0OVZuTEdBcHVBY25WZnU0bEgzM2poOENXb29TNFpqcm1sTXcxSWlnUms4YURYVGZFVGJzUThVTFJab0gzRlNRcVNMVGN2L1gYod_lzN8xSAASGwoMMzNhY3Jvc3MuY29tGLvZ5czfMUgAUgIIZBIYCgl5YWhvby5jb20YstzlzN8xSABSAghvEhkKCnVpZGFwaS5jb20Yu9nlzN8xSABSAghkEjsKCnB1YmNpZC5vcmcSJGE5NGI1ZTA4LTVmODQtNDUwZi05MThiLWJjNzM2ZGQwM2FjNxjY2eXM3zFIABIdCg5lc3AuY3JpdGVvLmNvbRi72eXM3zFIAFICCGQSFAoFb3BlbngYvt_lzN8xSABSAghv&nel=0&eid=44754608%2C44772139%2C44777649%2C44781409%2C44806631%2C95321947%2C95322027%2C95323893%2C95324128&top=https%3A%2F%2Fharrypotter.fandom.com%2Fwiki%2FHarry_Potter%3Ficbm__icFeaturedVideoPlayer%3D1&loc=https%3A%2F%2Fharrypotter.fandom.com%2Fwiki%2FHarry_Potter%3Ficbm__icFeaturedVideoPlayer%3D1&dlt=1709289616382&idt=3957&dt=1709289622160&cookie=ID%3De5eca99a834a772d%3AT%3D1709289598%3ART%3D1709289598%3AS%3DALNI_MY6GVQt4RZtUKHC8nyp2gBaYQFcvw&gpic=UID%3D00000d6668575b8e%3AT%3D1709289598%3ART%3D1709289598%3AS%3DALNI_MaRt9iROL0Csg8YFJcbgq1WR5w6tg&scor=4166663077479485&ged=ve4_td6_tt2_pd6_la6000_er599.131.985.816_vi0.0.1355.1217_vp100_eb24171';
const testCases = [
	{
		tagUrl: `https://test.com/?cust_params=${encodeURIComponent('foo=bar&rv=1')}`,
		expectedResult: `https://test.com/?cust_params=${encodeURIComponent('foo=bar&rv=2')}`,
	},
	{
		tagUrl: realLifeAdTagUrl,
		expectedResult: realLifeAdTagUrl.replace('rv%3D1', 'rv%3D2'),
	},
];

describe('updateRVParam', () => {
	it.each(testCases)('should update the value of rv in cust_params', ({ tagUrl, expectedResult }) => {
		const updatedUrl = updateRVParam(tagUrl, 2);
		expect(updatedUrl).toBe(expectedResult);
	});
});
