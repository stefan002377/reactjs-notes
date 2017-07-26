import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import $ from "jquery";

class NotesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listnotes: []
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    $.ajax({
      method: 'GET',
      url: '/data/notes.json',
      success: (listnotes) => {
        listnotes.map(edit => {
          return edit.statusEdit = 1;
        })
        this.setState({
          listnotes: listnotes
        });
      }
    });
  }

  actionDelete(id) {
    let templistnotes = this.state.listnotes
    templistnotes = templistnotes.filter(a => {
      return a.id_n !== id;
    })
    this.setState({listnotes: templistnotes});
  }

  actionEdit(id) {
    let templistnotes = this.state.listnotes
    templistnotes.map(a => {
      if (a.id_n === id) {
        return a.statusEdit = 0;
      }
      else {
        return a;
      }
    })
    this.setState({listnotes: templistnotes});
  }

  actionAdd(id) {
    let newAddValue = {
      id_n: this.state.listnotes.length + 1,
      title: '',
      statusEdit: 0
    }
    this.setState({
      listnotes: [...this.state.listnotes,newAddValue]
    });
  }



  actionBlur(id) {
    let templistnotes = this.state.listnotes
    templistnotes.map(a => {
      if (a.id_n === id) {
        return a.statusEdit = 1;
      }
      else {
        return a;
      }
    })
    this.setState({listnotes: templistnotes});
  }


  changeNotice(id, e) {
    let templistnotes = this.state.listnotes
    console.log(templistnotes);
    templistnotes.map(a => {
      if (a.id_n === id) {
        return a.title = e.target.value;
      }
      else {
        return a;
      }
    })
    console.log(templistnotes);
    this.setState({listnotes: templistnotes});
  }


  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.listnotes.map(n=>
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6" key={n.id_n}>
                <div className="notices">
                  {n.statusEdit===1 ? ( <p>{n.title}</p>
                  ) : (
                    <textarea className="form-table" onBlur={() => this.actionBlur(n.id_n)} onChange={(e) => this.changeNotice(n.id_n,e)} type="text" value={n.title}/>)
                  }
                  <div className="button-action">
                    <span onClick={()=> this.actionEdit(n.id_n)} className="glyphicon glyphicon-pencil"/>
                    <span className="glyphicon glyphicon-move"/>
                    <span onClick={()=> this.actionDelete(n.id_n)} className="glyphicon glyphicon-remove"/>
                  </div>
                </div>
            </div>
          )}
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                <div className="notices-add">
                  <div className="button-action">
                    <span onClick={()=> this.actionAdd()} className="glyphicon glyphicon-plus"/>
                  </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<NotesList/>, document.getElementById('root'));
