import React from 'react'

function Footer() {
    return (
        <footer className="footer">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__col-2">
                        <div className="footer__school">
                            <div className="footer__school-wrapper">
                                <h2 className="footer__school-name">trường đại học sư phạm hà nội</h2>
                                <span className="footer__website">Website: </span><a href="hnue.edu.vn" className="footer__website-link">hnue.edu.vn</a>
                            </div>
                        </div>
                    </div>

                    <div className="grid__col-6 ">
                        <div className="footer__col-6">
                            <div className="footer__career">
                                <h2 className="footer__career-name">khoa công nghệ thông tin</h2>
                                <span className="footer__website">Website: </span><a href="hnue.edu.vn" className="footer__website-link">fit.hnue.edu.vn</a>
                            </div>
                            <div className="footer__author">
                                <h2 className="footer__author-header">người sáng lập</h2>
                                <span className="footer__author-name" id="footer__author-name-1">Nguyễn Việt Tiến</span><span className="footer__author-name" id="footer__author-name-2">Tiến Việt Nguyễn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer