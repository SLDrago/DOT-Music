import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BottomRightLayout extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <>
        <div className="grid grid-cols-5 gap-4 text-sm">
            <div className='text-gray-400'>
                <div className='font-semibold text-white text-base mb-2'>Company</div>
                <div className='mb-1'>About</div>
                <div className='mb-1'>Jobs</div>
                <div className='mb-1'>For the Record</div>
            </div>
            <div className='text-gray-400'>
                <div className='font-semibold text-white text-base mb-2'>Communities</div>
                <div className='mb-1'>For Artists</div>
                <div className='mb-1'>Developers</div>
                <div className='mb-1'>Advertising</div>
                <div className='mb-1'>Investors</div>
                <div className='mb-1'>Vendors</div>
            </div>
            <div className='text-gray-400'>
                <div className='font-semibold text-white text-base mb-2'>Useful links</div>
                <div className='mb-1'>Support</div>
                <div className='mb-1'>Free Mobile App</div>
            </div>
            <div className='text-gray-400'>
                <div className='font-semibold text-white text-base mb-2'>DOT Plans</div>
                <div className='mb-1'>Premium Individual</div>
                <div className='mb-1'>Premium Duo</div>
                <div className='mb-1'>Premium Family</div>
                <div className='mb-1'>Premium Student</div>
                <div className='mb-1'>Vendors</div>
            </div>
            <div>
                <span></span>
            </div>
        </div>

        <hr className="my-8 text-gray-400"/>

        <div className='text-gray-400'>© 2024 DOT AB</div>
      </>
    )
  }
}
