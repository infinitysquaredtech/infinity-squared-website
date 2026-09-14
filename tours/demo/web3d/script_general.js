(function(){
var translateObjs = {};
function trans(a, b) {
    var c = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    return translateObjs[c[0x0]] = c, '';
}
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a]);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"scripts":{"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"textToSpeech":TDV.Tour.Script.textToSpeech,"historyGoForward":TDV.Tour.Script.historyGoForward,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"existsKey":TDV.Tour.Script.existsKey,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"registerKey":TDV.Tour.Script.registerKey,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"clone":TDV.Tour.Script.clone,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"unregisterKey":TDV.Tour.Script.unregisterKey,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"openLink":TDV.Tour.Script.openLink,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"mixObject":TDV.Tour.Script.mixObject,"setValue":TDV.Tour.Script.setValue,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"startMeasurement":TDV.Tour.Script.startMeasurement,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"setMapLocation":TDV.Tour.Script.setMapLocation,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getPixels":TDV.Tour.Script.getPixels,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"getOverlays":TDV.Tour.Script.getOverlays,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"playAudioList":TDV.Tour.Script.playAudioList,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"isPanorama":TDV.Tour.Script.isPanorama,"getKey":TDV.Tour.Script.getKey,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"cloneBindings":TDV.Tour.Script.cloneBindings,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"init":TDV.Tour.Script.init,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"getComponentByName":TDV.Tour.Script.getComponentByName,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"getMediaByName":TDV.Tour.Script.getMediaByName,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"shareSocial":TDV.Tour.Script.shareSocial,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"historyGoBack":TDV.Tour.Script.historyGoBack,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"createTween":TDV.Tour.Script.createTween,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"initAnalytics":TDV.Tour.Script.initAnalytics,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"downloadFile":TDV.Tour.Script.downloadFile,"resumePlayers":TDV.Tour.Script.resumePlayers,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"executeJS":TDV.Tour.Script.executeJS,"showPopupImage":TDV.Tour.Script.showPopupImage,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"quizShowScore":TDV.Tour.Script.quizShowScore,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"getMainViewer":TDV.Tour.Script.getMainViewer,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"quizStart":TDV.Tour.Script.quizStart,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"translate":TDV.Tour.Script.translate,"showWindow":TDV.Tour.Script.showWindow,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"initQuiz":TDV.Tour.Script.initQuiz,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"quizFinish":TDV.Tour.Script.quizFinish,"toggleVR":TDV.Tour.Script.toggleVR,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"enableVR":TDV.Tour.Script.enableVR,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"setLocale":TDV.Tour.Script.setLocale,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"disableVR":TDV.Tour.Script.disableVR,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"getMediaWidth":TDV.Tour.Script.getMediaWidth},"scrollBarMargin":2,"lockedOrientation":"landscape","buttonToggleFullscreen":"this.IconButton_7767DC39_469A_5A86_41CB_4A3374AF41B5","children":["this.MainViewer","this.IconButton_7767DC39_469A_5A86_41CB_4A3374AF41B5","this.IconButton_729BB4CE_468A_6B9D_41D0_955C3E306CB4","this.Container_0ED3FC18_46FA_5A85_41CB_5D744F5AD78D"],"id":"rootPlayer","mediaActivationMode":"button","layout":"absolute","creationPolicy":"inAdvance","data":{"history":{},"name":"Player18462","displayTooltipInTouchScreens":true,"textToSpeechConfig":{"pitch":1,"speechOnQuizQuestion":false,"speechOnInfoWindow":false,"volume":1,"speechOnTooltip":false,"rate":1,"stopBackgroundAudio":false},"defaultLocale":"en","locales":{"es":"locale/es.txt","en":"locale/en.txt"}},"backgroundColor":["#FFFFFF"],"hash": "c806e0ab16a970d0b9189c5fc208b6176002952c2873450466635c84839ccf5c", "definitions": [{"id":"effect_0CE3DF56_468E_568D_41B3_5A31F681E4E1","class":"FadeOutEffect","duration":500},{"surfaceReticleRadius":0.02,"sphericalHarmonicsMaxDegree":3,"environmentURL":"media/model_C12DC748_CAF8_251F_41D0_F964F2103A17/bg_C114E8A3_CAF8_2B11_41E1_10BC1BEDCA1D.jpg","backgroundPanoramaURL":"media/model_C12DC748_CAF8_251F_41D0_F964F2103A17/bg_D8DC0B03_D6A3_A5C6_41E4_491BBC797B73.jpg","antialiasingLevel":0.3,"lights":["this.light_C111C8A2_CAF8_2B13_41DE_F1FC93125866"],"data":{"showOnlyHotspotsLineSightInPanoramas":true,"keepModel3DLoadedWithoutLocation":true,"label":"silvania_e_adilson","showOnlyHotspotsLineSight":true},"environmentIntensity":0.5,"surfaceReticleMaxRadius":50,"thumbnailUrl":"media/model_C12DC748_CAF8_251F_41D0_F964F2103A17_t.jpg","backgroundColor":"#333333","class":"Model3D","camera":"this.cam_C11E28A1_CAF8_2B11_41B3_3A9E155461A3","floorRadius":20.98,"surfaceReticleMinRadius":15,"objects":[],"surfaceSelectionCoef":2,"model":"this.res_C12F774A_CAF8_2513_41C3_0716054AD34C","id":"model_C12DC748_CAF8_251F_41D0_F964F2103A17","label":trans('model_C12DC748_CAF8_251F_41D0_F964F2103A17.label')},{"backgroundOpacity":0,"id":"IconButton_0F4D2F79_468E_B687_41AB_86A57B660C2A","maxHeight":256,"maxWidth":256,"data":{"name":"close"},"right":"0%","minHeight":1,"minWidth":1,"verticalAlign":"middle","class":"IconButton","iconURL":"skin/IconButton_0F4D2F79_468E_B687_41AB_86A57B660C2A.png","top":"0%","width":56,"height":57,"horizontalAlign":"center","propagateClick":false,"click":"var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, this.effect_0CE3DF56_468E_568D_41B3_5A31F681E4E1, 'hideEffect', false)}.bind(this); invisibleFunc(this.Container_0ED3FC18_46FA_5A85_41CB_5D744F5AD78D)"},{"id":"mainPlayList","class":"PlayList","items":[{"media":"this.model_C12DC748_CAF8_251F_41D0_F964F2103A17","end":"this.trigger('tourEnded')","start":"this.MainViewerModel3DPlayer.set('displayPlaybackBar', true)","class":"Model3DPlayListItem","player":"this.MainViewerModel3DPlayer"}]},{"id":"MainViewerModel3DPlayer","class":"Model3DPlayer","viewerArea":"this.MainViewer"},{"subtitlesBottom":50,"subtitlesTop":0,"playbackBarHeadShadowOpacity":0.7,"height":"100%","surfaceReticleColor":"#FFFFFF","progressRight":"33%","playbackBarProgressBackgroundColorRatios":[0],"subtitlesGap":0,"subtitlesTextShadowHorizontalLength":1,"subtitlesTextShadowColor":"#000000","subtitlesBackgroundColor":"#000000","progressOpacity":0.7,"playbackBarHeadShadowBlurRadius":3,"progressBarBackgroundColorDirection":"horizontal","playbackBarBorderRadius":0,"playbackBarBackgroundOpacity":1,"playbackBarBorderColor":"#FFFFFF","playbackBarProgressBorderColor":"#000000","playbackBarLeft":0,"playbackBarHeadHeight":15,"data":{"name":"Main Viewer"},"progressBarBorderColor":"#000000","toolTipPaddingLeft":6,"playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadShadowColor":"#000000","playbackBarHeadBorderSize":0,"playbackBarHeadBorderRadius":0,"playbackBarHeadBorderColor":"#000000","progressBarBackgroundColorRatios":[0],"toolTipFontFamily":"Arial","subtitlesFontSize":"3vmin","playbackBarBorderSize":0,"playbackBarHeadShadow":true,"subtitlesBackgroundOpacity":0.2,"subtitlesTextShadowOpacity":1,"progressBorderColor":"#000000","playbackBarHeadBackgroundColor":["#111111","#666666"],"subtitlesTextShadowVerticalLength":1,"progressBorderRadius":2,"surfaceReticleSelectionColor":"#FFFFFF","toolTipTextShadowColor":"#000000","progressBarBackgroundColor":["#3399FF"],"vrPointerColor":"#FFFFFF","subtitlesBorderColor":"#FFFFFF","playbackBarBottom":5,"vrPointerSelectionColor":"#FF6600","id":"MainViewer","subtitlesFontColor":"#FFFFFF","toolTipPaddingTop":4,"progressBackgroundColor":["#000000"],"progressBottom":10,"toolTipShadowColor":"#333138","vrPointerSelectionTime":2000,"toolTipBorderColor":"#767676","toolTipBackgroundColor":"#F6F6F6","minHeight":50,"playbackBarHeight":10,"progressLeft":"33%","minWidth":100,"progressHeight":2,"playbackBarBackgroundColor":["#FFFFFF"],"toolTipFontColor":"#606060","class":"ViewerArea","playbackBarHeadWidth":6,"progressBorderSize":0,"progressBarBorderSize":0,"playbackBarProgressBorderSize":0,"progressBarBorderRadius":2,"playbackBarBackgroundColorDirection":"vertical","toolTipPaddingBottom":4,"width":"100%","playbackBarRight":0,"toolTipPaddingRight":6,"firstTransitionDuration":0,"playbackBarProgressBorderRadius":0,"progressBackgroundColorRatios":[0],"subtitlesFontFamily":"Arial","propagateClick":false,"playbackBarProgressBackgroundColor":["#3399FF"],"doubleClickAction":"none","toolTipFontSize":"1.11vmin"},{"backgroundOpacity":0,"id":"Image_0FA82578_468A_AA85_41D1_148E25AE1347","left":"0%","minHeight":1,"data":{"name":"image2"},"minWidth":1,"verticalAlign":"middle","url":trans('Image_0FA82578_468A_AA85_41D1_148E25AE1347.url'),"class":"Image","top":"24.99%","width":"50%","height":"50%","scaleMode":"fit_inside","horizontalAlign":"center","propagateClick":false},{"backgroundOpacity":0.3,"transparencyActive":true,"id":"IconButton_729BB4CE_468A_6B9D_41D0_955C3E306CB4","left":"11%","backgroundColor":[],"minHeight":1,"data":{"name":"joystick"},"minWidth":1,"verticalAlign":"middle","iconURL":"skin/IconButton_729BB4CE_468A_6B9D_41D0_955C3E306CB4.png","class":"IconButton","interactionEnabled":false,"bottom":"15%","width":"10%","backgroundColorRatios":[],"cursor":"default","horizontalAlign":"center","propagateClick":false,"height":"20%"},{"click":"var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, this.effect_0CE3DF56_468E_568D_41B3_5A31F681E4E1, 'hideEffect', false)}.bind(this); invisibleFunc(this.Container_0ED3FC18_46FA_5A85_41CB_5D744F5AD78D)","backgroundOpacity":0.4,"children":["this.Container_0E8E0CA1_4685_BB87_41C9_036021B79DBE"],"scrollBarMargin":2,"layout":"absolute","id":"Container_0ED3FC18_46FA_5A85_41CB_5D744F5AD78D","creationPolicy":"inAdvance","left":"0%","backgroundColor":["#000000"],"minHeight":20,"overflow":"scroll","minWidth":20,"data":{"name":"info panel"},"gap":10,"class":"Container","top":"0%","width":"100%","backgroundColorRatios":[1],"propagateClick":false,"scrollBarColor":"#000000","height":"100%"},{"children":["this.Image_0A1B6315_468A_6E8F_41C4_C2DCFE6ED8B4","this.Image_0FA82578_468A_AA85_41D1_148E25AE1347","this.IconButton_0F4D2F79_468E_B687_41AB_86A57B660C2A"],"scrollBarMargin":2,"layout":"absolute","id":"Container_0E8E0CA1_4685_BB87_41C9_036021B79DBE","creationPolicy":"inAdvance","left":"15%","right":"15%","overflow":"scroll","minWidth":20,"minHeight":20,"data":{"name":"Container"},"backgroundColor":["#000000"],"class":"Container","top":"15%","bottom":"15%","gap":10,"backgroundColorRatios":[1],"propagateClick":false,"scrollBarColor":"#000000"},{"backgroundOpacity":0,"transparencyActive":true,"pressedIconURL":"skin/IconButton_7767DC39_469A_5A86_41CB_4A3374AF41B5_pressed.png","id":"IconButton_7767DC39_469A_5A86_41CB_4A3374AF41B5","maxHeight":512,"maxWidth":512,"data":{"name":"fullscreen"},"right":"2.5%","minHeight":1,"minWidth":1,"verticalAlign":"bottom","mode":"toggle","class":"IconButton","iconURL":"skin/IconButton_7767DC39_469A_5A86_41CB_4A3374AF41B5.png","bottom":"3%","width":"5%","height":"10%","horizontalAlign":"right","propagateClick":false},{"backgroundOpacity":0,"id":"Image_0A1B6315_468A_6E8F_41C4_C2DCFE6ED8B4","data":{"name":"image1"},"right":"0%","minHeight":1,"minWidth":1,"verticalAlign":"middle","url":trans('Image_0A1B6315_468A_6E8F_41C4_C2DCFE6ED8B4.url'),"class":"Image","top":"25%","width":"50%","height":"50%","scaleMode":"fit_inside","horizontalAlign":"center","propagateClick":false},{"id":"light_C111C8A2_CAF8_2B13_41DE_F1FC93125866","class":"AmbientLight"},{"initialFov":95,"maxX":34.61,"class":"FirstPersonModel3DCamera","minZ":-2.7,"minY":1.63,"initialY":1.63,"id":"cam_C11E28A1_CAF8_2B11_41B3_3A9E155461A3","initialZ":-2.39,"autoNearFar":true,"maxZ":25.17,"initialX":4.57,"minX":-28.27,"translationSpeed":0.6,"maxY":1.78,"vrEnabled":true,"initialYaw":163.54,"initialPitch":-9.47},{"levels":[{"class":"Model3DResourceLevel","url":"media/model_C12DC748_CAF8_251F_41D0_F964F2103A17/scene.glb"},{"class":"Model3DResourceLevel","url":"media/model_C12DC748_CAF8_251F_41D0_F964F2103A17/scene_mobile.glb","tags":"mobile"}],"rotationY":10,"id":"res_C12F774A_CAF8_2513_41C3_0716054AD34C","class":"Model3DResource"}],"minHeight":0,"start":"this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_729BB4CE_468A_6B9D_41D0_955C3E306CB4], 'gyroscopeAvailable'); if(!this.get('fullscreenAvailable')) { [this.IconButton_7767DC39_469A_5A86_41CB_4A3374AF41B5].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","minWidth":0,"gap":10,"class":"Player","watermark":false,"defaultMenu":["fullscreen","mute","rotation"],"width":"100%","backgroundColorRatios":[0],"propagateClick":false,"scrollBarColor":"#000000","height":"100%"};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.1.34, Sat Aug 23 2025