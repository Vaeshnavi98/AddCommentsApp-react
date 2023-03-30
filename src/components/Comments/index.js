import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentList: [],
    inputName: '',
    inputComment: '',
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  addComment = event => {
    event.preventDefault()

    const {inputName, inputComment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: inputName,
      comment: inputComment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      inputName: '',
      inputComment: '',
    }))
  }

  onChangeName = event => {
    this.setState({inputName: event.target.value})
  }

  onChangeComment = event => {
    this.setState({inputComment: event.target.value})
  }

  render() {
    const {commentList, inputName, inputComment} = this.state

    return (
      <div className="background">
        <h1>Comments</h1>
        <form onSubmit={this.addComment}>
          <div className="main-div">
            <div className="div-deco">
              <p>Say something about 4.0 Technologies</p>
              <input
                onChange={this.onChangeName}
                value={inputName}
                placeholder="Your Name"
                className="input-deco"
              />
              <textarea
                placeholder="Your Comment"
                className="input-deco"
                onChange={this.onChangeComment}
                value={inputComment}
                rows="6"
              />
              <div>
                <button type="submit" className="button-deco">
                  Add Comment
                </button>
              </div>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="img-deco"
              />
            </div>
          </div>
        </form>
        <hr />
        <p className="heading">
          <span className="comments-count">{commentList.length}</span>
          Comments
        </p>
        <ul>
          {commentList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleIsLiked={this.toggleIsLiked}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
