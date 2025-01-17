import React, { Component } from 'react';
import BottomRightLayout from '../Home/bottomRightLayout';

export default class BodyRightLayout extends Component {
  render() {
    return (
      <>
        <div className='mx-8 my-4'>
          <div style={{ fontSize: '78px', backgroundColor:'#faa769'}} className='font-extrabold pt-10 pb-10 px-5 rounded-lg'>
            Podcasts
          </div>
          <div className='mt-16 text-xl font-semibold'>
            <div className='font-bold text-2xl pb-5'>Categories</div>
            <div class="grid grid-cols-4 gap-1">
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Educational</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Documentary</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Comedy</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Pop Culture</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Fitness & Nutrition</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Celebrities</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>TV</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Beauty</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Video games</div>
              <div className='bg-slate-600 m-2 pt-2 px-4 pb-24 rounded-lg'>Film</div>
            </div>
            <div className='mt-6'>
              <button className="rounded-full bg-slate-800 text-white py-2 text-sm font-bold px-4 hover:bg-gray-200 hover:text-black transition-colors">
                <a href=''>See All Categories</a>
              </button>
            </div>
          </div>
        </div>

        <div className='mx-8 my-4 mt-16'>
          <BottomRightLayout/>
        </div>
      </>
    );
  }
}
