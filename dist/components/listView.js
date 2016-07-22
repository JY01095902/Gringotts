ListView = React.createClass({
    getInitialState: function () {
        return { 
            data: []
        };
    },
    stateChange: function (data) {
        this.setState({ data: data });
    },
    componentDidMount: function(){
        this.unsubscribe = this.props.config.store.listen(this.stateChange);    
        if (this.isMounted()) {
            BillsActions.getNextPage();
        }
    },
    componentWillUnmount: function(){
        this.unsubscribe();
    },  
    render: function () {
        var items = [];
        var data = this.state.data;
        if(data != null && data.length > 0){
            for(var i in data){
                var item = data[i];
                var media = null;
                var img = item.img;
                if(img != null && img != {} && img.src != null && img.src != '' ){
                    media = <img src={img.src} width="80" />;
                }else{
                    var icon = item.icon;
                    if(icon != null && icon != {} && icon.className != null && icon.className != '' ){
                        media = <i className={icon.className}></i>;
                    }
                }
                var title = null;
                if(item.title != null && item.title != ''){
                    title = <div className="item-title">{item.title}</div>;
                }
                var titleAfter = null;
                if(item.titleAfter != null && item.titleAfter != ''){
                    titleAfter = <div className="item-after">{item.titleAfter}</div>;
                }
                var subtitle = null;
                if(item.subtitle != null && item.subtitle != ''){
                    subtitle = <div className="item-subtitle">{item.subtitle}</div>;
                }
                var subtitleAfter = null;
                if(item.subtitleAfter != null && item.subtitleAfter != ''){
                    subtitleAfter = <div className="item-after">{item.subtitleAfter}</div>;
                }
                var text = null;
                if(item.text != null && item.text != ''){
                    text = <div className="item-text" style={{height: 'auto'}}>{item.text}</div>;
                }
                var item = <li key={i} data-id={i}>
                                <a href="#" className="item-link item-content">
                                    <div className="item-media">{media}</div>
                                    <div className="item-inner">
                                        <div className="item-title-row">
                                            {title}
                                            {titleAfter}
                                        </div>
                                        <div className="item-title-row" style={{backgroundImage: 'none'}}>
                                            {subtitle}
                                            {subtitleAfter}
                                        </div>
                                        {text}
                                    </div>
                                </a>
                            </li>;
                items.push(item);
            }
        }
        //className="infinite-scroll" data-distance="100" style={{overflow: 'auto', WebkitOverflowScrolling: 'touch', boxSizing: 'border-box', height: '100%', position: 'relative', zIndex: '1'}}
        /*
        <div className="infinite-scroll-preloader" style={{marginTop: '-20px', marginBottom: '10px', textAlign: 'center'}}>
            <div className="preloader" style={{width: '34px', height: '34px'}}></div>
        </div>
        */
        return (
            <div className="list-block media-list">
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
});